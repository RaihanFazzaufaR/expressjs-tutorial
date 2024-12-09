import express  from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const MockUsers = [
    {id: 1, username: "John Doe", display: "John"},
    {id: 2, username: "Jane Doe", display: "Jane"},
    {id: 3, username: "John Smith", display: "JohnS"}
];
app.get("/", (req, res) => {
    res.status(201).send({ msg: "Hello World" });
});

app.get("/api/users", (req, res) => {
    res.send(MockUsers);
});

app.get("/api/users/:id", (req, res) => {
    console.log(req.params);
    const parsedId = parseInt(req.params.id);
    console.log(parsedId);
    if (isNaN(parsedId)) {
        return res.status(400).send({msg: "Invalid ID supplied"});
    }

    const findUser = MockUsers.find(user => user.id === parsedId);
    if (!findUser) {
        return res.status(404).send({msg: "User not found"});
    }
    return res.send(findUser);
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