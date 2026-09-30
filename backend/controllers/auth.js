import database from "../database/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    //uplod vako image ko path
    const imagepath= re.file? `images/${req.file.filename}`: null;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Check whether email already exists
    const checkQuery = "SELECT * FROM users WHERE email = ?";

    database.query(checkQuery, [email], async (err, data) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
          error: err,
        });
      }

      if (data.length > 0) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      const insertQuery = `
        INSERT INTO users (name, email, phone, password)
        VALUES (?, ?, ?, ?)
      `;

      database.query(
        insertQuery,
        [name, email, phone || null, hashedPassword],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Error while registering user",
              error: err,
            });
          }

          const userId = result.insertId;

          if(imagepath){
            const imageQuery = "insert into profile (user_id,path) values(?,?)";

            database.query(imageQuery, [userId, imagePath],
              (err, result) => {
                if (err) {
                  return res.status(500).json({
                    message: "Error while saving profile image",
                    error: err,
                  });
                }

                return res.status(201).json({
                  message: "User registered successfully",
                  user: {
                    id: userId,
                    name,
                    email,
                    phone: phone || null,
                    role: "user",
                    image: imagepath, // Default role
                  },
                });
              }
            );
          } else {
            return res.status(201).json({
              message: "User registered successfully",
              user: {
                id: userId,
                name,
                email,
                phone: phone || null,
                role: "user",
                image: null, 
              },
            });
          }
        }
      );
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};


// LOGIN
export const login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const query = "SELECT * FROM users WHERE email = ?";

    database.query(query, [email], async (err, data) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
          error: err,
        });
      }

      // User doesn't exist
      if (data.length === 0) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const user = data[0];

      // Compare password
      const passwordMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatch) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
      
      const token = jwt.sign ({
        userId: user.id,
        username: user.name,
        userEmail: user.email,
        userRole: user.role,
      }, "mysecretkey",
      );
      // Don't send password to frontend
      return res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};