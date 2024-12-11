import express  from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const MockUsers = [
    {id: 1, username: "John Doe", display: "John"},
    {id: 2, username: "Jane Doe", display: "Jane"},
    {id: 3, username: "John Smith", display: "JohnS"},
    {id: 4, username: "Jane Smith", display: "JaneS"},
    {id: 5, username: "John Doen", display: "JohnDn"},
    {id: 6, username: "Jane Doen", display: "JaneDn"},
    {id: 7, username: "John Smit", display: "JohnSt"},
];
app.get("/", (req, res) => {
    res.status(201).send({ msg: "Hello World" });
});

app.get("/api/users", (req, res) => {
    console.log(req.query);
    const { 
        query: { filter, value }, 
    } = req;
    if (filter && value) {
        const findUser = MockUsers.filter(user => user[filter].toLowerCase().includes(value.toLowerCase()));
        return res.send(findUser);
    }
    return res.send(MockUsers);
});

app.post("/api/users", (req, res) => {
    console.log(req.body);
    const newUser = { id: MockUsers.length + 1, ...req.body };
    MockUsers.push(newUser);
    return res.status(201).send(MockUsers);
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