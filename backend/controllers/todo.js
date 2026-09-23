import database from "../database/database.js";


export const getTodos = (req, res) => {
    try{
        const q = "SELECT * FROM todos ORDER BY id DESC";
        database.query(q, (err, data) => {
            if(err){
                return res.send({message: "Error while fetching data", error: err});
            }
            return res.status(200).send({message: "Data fetched successfully", data: data});
        });
    }catch(error){
        console.log(error);
    }
};


export const createTodo = (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
      return res.status(400).send({
        message: "Please provide all required fields",
      });
    }

    const q =
      "INSERT INTO todos (title, description, priority) VALUES (?, ?, ?)";

    database.query(q, [title, description, priority], (err, data) => {
      if (err) {
        return res.status(500).send({
          message: "Error while creating todo",
          error: err,
        });
      }

      return res.status(201).send({
        message: "Todo created successfully",
        todo: {
          id: data.insertId,
          title: title,
          description: description,
          priority: priority,
        },
      });
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      message: "Server error",
    });
  }
};