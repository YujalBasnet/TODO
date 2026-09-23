import React, { useState, useEffect } from "react";
import axios from "axios";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => { getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get-todo");
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
    const response= await axios.post("http://localhost:5000/api/create-todo",{
      title:title,
      description:description,
      priority:priority
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
  }


  
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
    <div className="min-h-screen border-2 border-black bg-[#3a1111]">

      <h1 className="text-center text-white text-5xl pt-2">
        TODO LIST
      </h1>

      
      <div className="flex justify-center items-center mt-[20px] py-[10px]">

        <input
          className="w-1/2 border-2 border-black text-2xl bg-white p-[10px] rounded-lg"
          type="text"
          placeholder="Search"
        />

        <button
          onClick={handleAdd}
          className="ml-[10px] border-2 border-black text-2xl cursor-pointer py-[10px] px-[20px] bg-white rounded-lg hover:bg-gray-300"
        >
          Add
        </button>

      </div>

      <div className="grid grid-cols-4 gap-[20px] px-[20px] mt-[20px] items-start">


        {showForm && (
  <div className="min-h-[420px] border-2 border-black bg-[#124f4f] p-[20px]">
    
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
            className="h-[33vh] border-2 border-black bg-[#124f4f] rounded-xl p-[20px]"
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

          </div>
        ))}

      </div>

    </div>
  );
};

export default Todo;