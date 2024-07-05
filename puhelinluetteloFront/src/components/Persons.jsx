const Persons = ({ filter, persons, deletePerson }) => {
    return (
        <>
            {filter !== '' ? 
                persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())).map((person, i) => 
                    <p key={i}>{person.name} {person.number}</p>
                    ) : 
                    persons.map((person, i) => 
                    <p key={i}>{person.name} {person.number}<button onClick={() => deletePerson(person.id)}>Delete</button></p>
            )}
        </>
    );
};

export default Persons;