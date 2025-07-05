import express from "express";

const app = express();

const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

//Add a new tea
app.post("/tea", (req, res) => {
  const { name, price } = req.body;
  const newTea = {
    id: nextId++,
    name,
    price,
  };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//Get all tea in array
app.get("/tea", (req, res) => {
  res.status(200).send(teaData);
});

//get tea id
app.get("/tea/:id", (req, res) => {
  const teas = teaData.find((t) => t.id === parseInt(req.params.id));

  if (!teas) {
    return res.status(404).send("Tea not found!");
  }
  res.status(200).send(teas);
});

//update
app.put("/tea/:id", (req, res) => {
  const teas = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!teas) {
    return res.status(404).send("Tea not found!");
  }

  const { name, price } = req.body;
  teas.name = name;
  teas.price = price;
  res.status(200).send(teas);
});

//delete
app.delete("/tea/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).send("Tea not found!");
  }

  teaData.splice(index, 1);
  return res.status(204).send("deleted!");
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});
