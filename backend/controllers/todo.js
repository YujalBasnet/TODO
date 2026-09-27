import database from "../database/database.js";


export const getTodos = (req, res) => {
    try{
      const user_id = req.user?.userId; // Get user_id from the decoded token
  
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
    const {  title, description, priority } = req.body;
    const user_id = req.user?.userId; // Get user_id from the decoded token

    if (!title || !description || !priority) {
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

export const deleteTodo = (req, res) => {
  try{

    console.log("Params:", req.params);
    console.log("Body:", req.body);

    const { id } = req.params;
    const {user_id} = req.body;
    console.log("Todo ID:", id, "User ID:", user_id);

    if(!id || !user_id){
      return res.status(400).send({message: "id and user_id are required"});
    }
    const q = "DELETE FROM todos WHERE id = ? AND user_id = ?";

    database.query(q, [id, user_id], (err, data) => {
      if(err){
        return res.status(500).send({message: "Error while deleting todo", error: err});
      }
      if(data.affectedRows === 0){
        return res.status(404).send({message: "Todo not found"});
      }
      return res.status(200).send({message: "Todo deleted successfully"});
    });

  } catch(error){
    console.log(error);
    return res.status(500).send({
      message: "Server error",
    });
  }
};