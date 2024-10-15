import express, { json, urlencoded } from "express";
import productsRoutes from './routes/products/index';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/products", productsRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
