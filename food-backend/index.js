import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import * as dotenv from "dotenv";
import cors from "cors";
import { connectToDB } from "./database/mongodb-connect.js";
import { authRoutes } from "./routes/auth-routes.js";
import errorHandler from "./middleware/error-handler.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { listRoutes } from "./routes/listing-routes.js";

const app = express();
dotenv.config();

app.use(helmet());
app.use(morgan("combined"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

connectToDB();

app.use("/api/auth", authRoutes);

app.use("/api/list", listRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 5000);
