import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

import numberService from './services/Numbers';


function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    numberService
      .getAll()
      .then(data => {
          setPersons(data);
        })
  }, []);

  const handleNewPerson = (e) => {
    e.preventDefault();

    if (!persons.some(person => person.name === newName) && newNumber !== '') {
      const newPerson = {
        name: newName,
        number: newNumber
      };

      numberService
      .create(newPerson)
        .then(data => {
          setPersons(persons.concat(data));
        })
        .then(
          setMessage(`Added: ${newName}`),
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        )
        .catch(error => {
          console.log("post error");
        });
    }

    else {
      const userResponse = confirm(`${newName} is already added to phonebook or number was not given`);
    
      if (userResponse) {
        const newperson = persons.find(person => person.name === newName);
        const changedPerson = { ...newperson, number: newNumber };
  
        numberService
          .updatePerson(newperson.id, changedPerson)
          .then(data => {
            setPersons(persons.map(person => person.id !== newperson.id ? person : data));
          })
          .then(
            setMessage(`Updated: ${newName}`),
            setTimeout(() => {
              setMessage(null)
            }, 2000)
          )
          .catch(error => {
            console.log(error)
            setMessage(`Information of ${newName} has already been removed from server`),
            setTimeout(() => {
              setMessage(null)
            }, 2000)
          });
        
      }
    }


    setNewName('');
    setNewNumber('');
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id);

    numberService
      .deletePerson(id, person)
        .then()
        .then(
          setMessage(`Deleted: ${person.name}`),
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        )
        .catch(error => {
          console.log("delete error")
        })

    setPersons(persons.filter(person => person.id !== id))
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new</h2>
      <PersonForm handleNewPerson={handleNewPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} deletePerson={deletePerson}/>
    </>
  );
};

export default App;
