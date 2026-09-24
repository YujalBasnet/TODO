import express from "express";
import UserRoutes from "./routes/user.route.js";
import database from "./database/database.js";
import todoRoutes from "./routes/todo.routes.js";
// import AuthRoutes from "./routes/auth.route.js";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;





app.use("/api", todoRoutes);
app.use("/user", UserRoutes);
// app.use("/api", AuthRoutes); 
// app.get("/", (req, res) => {
//   res.send("Backend is running!");
// });


// app.get("/user", (req, res) => {
//   const user = {
//     name: "Yujal Khulal Basnet",
//     email: "yujal@gmail.com",
//     phone_number: "9800000000",
//     address: "Gothgaun, Morang",
//     role: "user",
//   };
//   console.log(user);
//   res.send(user);
// });

// app.post("/post-user", (req, res) => {
//     const{ username, password} = req.body;
//     res.send({username: username, password: password});
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});