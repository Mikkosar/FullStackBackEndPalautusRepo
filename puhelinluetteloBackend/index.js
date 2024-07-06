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

app.get('/info', async (request, response) => {
    const date = new Date();
    const stats = await Person.countDocuments({})
    response.send(
        `<h3>Phonebook has info for ${stats} people</h3>
            <p>${date}</p>`
    );
});

app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(p => {
            response.json(p);
        })
        .catch(error => next(error))
});

app.get('/api/persons/:id', (request, resposne, next) => {
    Person.findById(request.params.id)
        .then(p => {
            if (p) {
                resposne.json(p);
            }
            else {
                resposne.status(404).end();
            }
        })
        .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
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
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end();
        })

});

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number,
    };

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedNumber => {
            res.json(updatedNumber);
        })
        .catch(error => next(error));
});

const uknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'uknownk endpoint' });
};

app.use(uknownEndpoint);

const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    }

    if (error.name === 'DatabaseError') {
        return res.status(500).send({ error: "the database save operation failed" })
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
