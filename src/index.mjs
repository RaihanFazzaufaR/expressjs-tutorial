import express  from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
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
        const findUser = mockUsers.filter(user => user[filter].toLowerCase().includes(value.toLowerCase()));
        return res.send(findUser);
    }
    return res.send(mockUsers);
});

app.post("/api/users", (req, res) => {
    console.log(req.body);
    const newUser = { id: mockUsers.length + 1, ...req.body };
    mockUsers.push(newUser);
    return res.status(201).send(mockUsers);
});  

app.get("/api/users/:id", (req, res) => {
    console.log(req.params);
    const parsedId = parseInt(req.params.id);
    console.log(parsedId);
    if (isNaN(parsedId)) {
        return res.status(400).send({msg: "Invalid ID supplied"});
    }

    const findUser = mockUsers.find(user => user.id === parsedId);
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

app.put("/api/users/:id", (req, res) => {
    const {
        body,
        params: { id },
    } = req;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return res.status(400).send({msg: "Invalid ID supplied"});
    }
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) {
        return res.status(404).send({msg: "User not found"});
    }
    mockUsers[findUserIndex] = { id: parsedId, ...body };
    return res.status(200).send(mockUsers);
});

app.patch("/api/users/:id", (req, res) => {
    const {
        body,
        params: { id },
    } = req;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return res.status(400).send({msg: "Invalid ID supplied"});
    }
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) {
        return res.status(404).send({msg: "User not found"});
    }
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
    return res.status(200).send(mockUsers);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});