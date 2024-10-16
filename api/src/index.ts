import express, { json, urlencoded } from "express";
import productsRoutes from './routes/products/index.js';
import authRoutes from './routes/auth/index.js';
import serverless from 'serverless-http';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/products", productsRoutes);
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

if (process.env.NODE_ENV === 'dev') {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

export const handler = serverless(app);