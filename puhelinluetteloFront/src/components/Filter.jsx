const Filter = ({ filter, setFilter }) => {

    return (
        <p>Filter shown with: <input value={filter} onChange={(e) => setFilter(e.target.value)} /></p>
    )
}

export default Filter;