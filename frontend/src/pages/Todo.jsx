import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Todo() {
  const { currentUser } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  

  useEffect(() => { if(currentUser){

   getTodos();
  }
  }, [currentUser]);

  const getTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/get-todo",
      {
        headers:{
          Authorization: `Bearer ${token}`,
          
        },
      }
      );
      setTodos(response.data.data);
    } 
    catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

 
  const handleSubmit = async () => {
  if (!title || !description || !priority) {
    alert("Please fill all fields!");
    return;
  }

  try{
    const token = localStorage.getItem("token");
    const response= await axios.post("http://localhost:5000/api/create-todo",{
      
      title:title,
      description:description,
      priority:priority
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    
    setTodos([...todos, response.data.todo]);

    setTitle("");
    setDescription("");
    setPriority("");
    setShowForm(false);
  } 
  catch (error) {
    console.error("Error creating todo:", error);
  }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
    if (!confirmDelete) {
      return;
    }

    try{
      const token = localStorage.getItem("token");
      const response = await axios.delete(`http://localhost:5000/api/delete-todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    }
    catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  
  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setPriority("");
    setShowForm(false);
  };

  
  const handleAdd = () => {
    setTitle("");
    setDescription("");
    setPriority("");

    setShowForm(true);
  };

  return (
    <div className="min-h-screen border-2 border-black bg-[#3a1111] px-3 sm:px-5 lg:px-8">

      <h1 className="text-center text-white text-3xl sm:text-4xl lg:text-5xl pt-4">
        TODO LIST
      </h1>

      
      <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 mt-5 py-3">

        <input className="w-full sm:w-1/2 border-2 border-black text-lg sm:text-2xl bg-white p-3 rounded-lg"
          type="text"
          placeholder="Search"
        />

        <button onClick={handleAdd}
          className="w-full sm:w-auto border-2 border-black text-lg sm:text-2xl cursor-pointer py-3 px-6 bg-white rounded-lg hover:bg-gray-300">
          Add
        </button>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 pb-8 items-start">


        {showForm && (
    <div className="min-h-[280px] sm:min-h-[420px] border-2 border-black bg-[#124f4f] p-4 sm:p-5 rounded-xl">
    
    <h2 className="text-center text-white text-2xl font-bold mb-[15px]">
      Add Todo
    </h2>

    <input
      className="w-full border-2 border-black p-[10px] text-xl bg-white"
      type="text"
      placeholder="Enter Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <textarea
      className="w-full border-2 border-black p-[10px] text-lg mt-[15px] bg-white resize-none"
      placeholder="Enter Description"
      rows="3"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

    <select
      className="w-full border-2 border-black p-[10px] text-lg mt-[15px] bg-white"
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
    >
      <option value="">Select Priority</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>

    <div className="mt-[20px] text-center">
      <button
        onClick={handleSubmit}
        className="py-[10px] px-[25px] m-[5px] cursor-pointer border-2 border-black bg-white hover:bg-green-400"
      >
        Submit
      </button>

      <button
        onClick={handleCancel}
        className="py-[10px] px-[25px] m-[5px] cursor-pointer border-2 border-black bg-white hover:bg-red-400"
      >
        Cancel
      </button>
    </div>

  </div>
)}

        {todos.map((todo) => (
          <div
            key={todo.id}
            className="min-h-[280px] border-2 border-black bg-[#124f4f] rounded-xl p-5"
          >

            <h2 className="text-center text-white text-2xl font-bold border-b-2 border-white pb-[10px]">
              {todo.title}
            </h2>

            <p className="text-white text-lg mt-[20px]">
              <span className="font-bold">
                Description:
              </span>

              <br />

              {todo.description}
            </p>

            <p className="text-white text-lg mt-[15px]">
              <span className="font-bold">
                Priority:
              </span>{" "}

              {todo.priority}
            </p>
            <div className="flex justify-center mt-[25px]">
              <button
                onClick={() => handleDelete(todo.id)}
                className="border-2 border-black bg-white px-5 py-2 cursor-pointer hover:bg-red-500 hover:text-white rounded-lg">
                Delete
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Todo;