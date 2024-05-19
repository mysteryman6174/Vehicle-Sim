import dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../frontend/dist/")));
const port = process.env.PORT || 3000;

app.get("/api", (_req, res) => {
	res.status(418).send("I'm a teapot");
});

import ApiError from "./apiError";
import { router as ScenariosRouter } from "./scenarios/router";
import { router as VehiclesRouter } from "./vehicles/router";

app.use("/api/scenarios", VehiclesRouter);
app.use("/api/scenarios", ScenariosRouter);

app.get("*", (_req, res) => {
	res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
	if (err instanceof ApiError) {
		res.status(err.statusCode).json(err.data || { message: err.message });
	} else {
		res.status(500).send(err.message);
	}
});

app.listen(port, () => console.log(`Server started on port ${port}`));
