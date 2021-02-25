import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import application from '../constants/application';
import routes from '../routes';

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());


app.use(application.url.base, routes);

export default app;
