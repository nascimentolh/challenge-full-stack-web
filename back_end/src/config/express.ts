import express from 'express'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser';

const app = express();
dotenv.config();

app.use(bodyParser.json());

export default app;


