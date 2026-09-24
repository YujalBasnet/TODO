import database from "../database/database.js";


export const getTodos = (req, res) => {
    try{
      const { user_id } = req.query;
      if(!user_id){
        return res.status(400).send({message: "user_id is required"});
      }
        const q = "SELECT * FROM todos WHERE user_id = ? ORDER BY id DESC";
        database.query(q, [user_id], (err, data) => {
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
    const { user_id, title, description, priority } = req.body;

    if (!user_id || !title || !description || !priority) {
      return res.status(400).send({
        message: "Please provide all required fields",
      });
    }

    const q =
      "INSERT INTO todos (user_id, title, description, priority) VALUES (?, ?, ?, ?)";

    database.query(q, [user_id,title, description, priority], (err, data) => {
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
          user_id: user_id,
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