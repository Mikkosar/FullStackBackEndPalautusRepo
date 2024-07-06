const mongoose = require('mongoose');

if (process.argv.length<3) {
  console.log('give password as argument');
  process.exit(1);
};

const password = process.argv[2];

const url = `mongodb+srv://mikkosar12:${password}@phonebook.rzhxzp9.mongodb.net/?retryWrites=true&w=majority&appName=Phonebook`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('person', personSchema);

if (process.argv.length > 3) {
    const name = process.argv[3];
    const number = process.argv[4];

    const newPerson = new Person ({
        name: name,
        number: number,
    })

    newPerson.save().then(result => {
        console.log(`Added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });
};

if (process.argv.length === 3) {
    console.log('Phonebook:')
    Person
        .find({})
            .then(result => {
                result.forEach(p => {
                    console.log(p);
                });
                mongoose.connection.close();
            });
};