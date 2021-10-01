import express from "express";
import helmet from "helmet";
import cors from 'cors';
import authRoute from "../routes/v1/auth";
import teamRoute from "../routes/v1/team";
import threadRoute from "../routes/v1/thread";
import apiResponseHandler from "../utils/apiResponse";
import isAuthorized from "../middlewares/auth";

const app = express();

// parse body params and attache them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());


// routes
app.use('/v1/auth', authRoute);
app.use('/v1/team', isAuthorized, teamRoute);
app.use('/v1/thread', isAuthorized, threadRoute);

// response handler
app.use(apiResponseHandler);

export default app;