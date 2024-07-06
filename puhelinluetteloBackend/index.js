require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person')

const app = express();

morgan.token('post-data', (request) => {
    return JSON.stringify(request.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));
app.use(express.json());
app.use(cors());
app.use(express.static('dist'))

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => Number(n.id)))
      : 0
    return String(maxId + 15)
};

app.get('/info', (request, response) => {
    const date = new Date();
    response.send(
        `<h3>Phonebook has info for ${persons.length} people</h3>
            <p>${date}</p>`
    );
});

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(p => {
            response.json(p);
        });
});

app.get('/api/persons/:id', (request, resposne) => {
    Person.findById(request.params.id)
        .then(p => {
            resposne.json(p);
        });
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save()
        .then(savedPerson => {
            response.json(savedPerson);
        });
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(p => p.id !== id);

    res.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
