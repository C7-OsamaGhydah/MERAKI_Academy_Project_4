require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db=require("./models/db");

const app = express();
const PORT = process.env.PORT ||5000

app.use(cors());
app.use(express.json());


// Import Routers
const rolesRouter=require("./routes/roles")
const usersRouter=require("./routes/users")
const itemsRouter=require("./routes/items")
const commentsRouter=require("./routes/comments")



// Routes Middleware
app.use("/roles",rolesRouter)
app.use("/users",usersRouter)
app.use("/items",itemsRouter)
app.use("/comments",commentsRouter)


// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});


