import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv"
import connectDB from "./SRC/Database/db.js";
import router from "./SRC/routes/index.js";

dotenv.config()
const app = express()

app.use(cors({origin:'*'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/v1', router)

const startApp = async () => {

    const PORT = process.env.PORT
    connectDB()
    try {
        app.listen(PORT,() => {console.log(
            `connect_verse running on http://localhost:${PORT}`
        );
        })
    } catch (error) {
        console.log(error);
    }
}

startApp()

app.get("/", (req, res) => {
    res.send('API IS RUNNING')
})