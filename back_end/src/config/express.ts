import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import application from '../constants/application';
import routes from '../routes';

const app = express();
dotenv.config();

app.use(bodyParser.json());

app.use(application.url.base, routes);

export default app;
