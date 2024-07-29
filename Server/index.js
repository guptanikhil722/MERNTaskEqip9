import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import cookieSession from "cookie-session";
import userRoutes from "./routes/users.js"

const app = express();
const PORT = process.env.PORT || 6001;

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.use(cors());
// app.use()
app.use("/auth", authRoutes);
app.use("/users", userRoutes);