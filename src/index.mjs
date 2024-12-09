import express  from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(201).send({ msg: "Hello World" });
});

app.get("/api/users", (req, res) => {
    res.send([  
            {id: 1, name: "John Doe"},
            {id: 2, name: "Jane Doe"},
            {id: 3, name: "John Smith"}
    ]);
});

app.get("/api/products", (req, res) => {
    res.send([  
            {id: 1, name: "Product 1"},
            {id: 2, name: "Product 2"},
            {id: 3, name: "Product 3"}
    ]);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});