const PersonForm = ({handleNewPerson, newName, setNewName, newNumber, setNewNumber}) => {
    return (
        <form onSubmit={handleNewPerson}>
        <p>Name: <input value={newName} onChange={(e) => setNewName(e.target.value)} /></p>
        <p>Number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} /></p>
        <button type="submit">add</button>
      </form>
    );
};

export default PersonForm;