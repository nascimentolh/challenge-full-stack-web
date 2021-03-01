import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import application from '../constants/application';
import joiErrorHandler from '../middlewares/joiErrorHandler';
import * as errorHandler from '../middlewares/apiErrorHandler';
import routes from '../routes';
import { pagination } from 'typeorm-pagination';

const app = express();
dotenv.config();

app.use(cors());
app.use(pagination);
app.use(bodyParser.json());

app.use(application.url.base, routes);
app.use(joiErrorHandler);
app.use(errorHandler.notFoundErrorHandler);

export default app;
