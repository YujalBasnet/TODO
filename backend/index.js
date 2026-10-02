
console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);
import express from "express";
import UserRoutes from "./routes/user.route.js";
import database from "./database/database.js";
import todoRoutes from "./routes/todo.routes.js";
import aiRoutes from "./routes/ai.routes.js";
// import AuthRoutes from "./routes/auth.route.js";
import cors from "cors";

// dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve static files from the "public" directory
const PORT = 5000;





app.use("/api", todoRoutes);
app.use("/api/ai", aiRoutes);
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