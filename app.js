import { connectDB } from './db/connect.js'
import express from 'express';
const app = express();
import router from './routes/tasks.js';
import 'dotenv/config'

// middleware
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks', router)

// routes
app.get('/', (req, res) => {
    res.send('Task Manager');
}) 
   
const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}  
 
start();