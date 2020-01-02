import './db/db';
import express = require("express");
import cors = require("cors");
import userRouter from './routers/userRouter'
import roleRouter from './routers/roleRouter'
import courseRouter from './routers/courseRouter'

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use(roleRouter);
app.use(userRouter);
app.use(courseRouter);


app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`)
});