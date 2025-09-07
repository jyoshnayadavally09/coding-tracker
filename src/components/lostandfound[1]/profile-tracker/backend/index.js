import express from "express";
import cors from "cors";
import leetcodeRouter from "./routes/leetcode.js";
import codeforcesRouter from "./routes/codeforces.js";
import githubRouter from "./routes/github.js";

const app = express();
app.use(cors());

app.use("/api/leetcode", leetcodeRouter);
app.use("/api/codeforces", codeforcesRouter);
app.use("/api/github", githubRouter);

app.listen(5000, () => console.log("Backend running on port 5000"));
