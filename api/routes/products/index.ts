import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("This is the list of products!");
});

router.get("/:id", (req, res) => {
  console.log(req.params);
  res.send(`This is the product with id ${req.params.id}`);
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.send("This is the product with id " + req.body.id);
});

export default router;
