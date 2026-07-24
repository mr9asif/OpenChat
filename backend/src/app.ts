import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { aiModelRoutes } from "./modules/aiModel/aiModel.route";
import { aiProviderRoute } from "./modules/aiProvider/aiProvider.route";
import { AuthRouter } from "./modules/auth/auth.route";
import { UserRoute } from "./modules/user/user.route";

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// api
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRoute);
app.use("/api/provider", aiProviderRoute);
app.use("/api/model", aiModelRoutes);

export default app;
