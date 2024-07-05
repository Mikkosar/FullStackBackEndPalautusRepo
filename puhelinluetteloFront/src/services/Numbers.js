import axios from "axios";
const basedUrl = '/api/persons';

const getAll = () => {
    const request = axios.get(basedUrl);
    return request
        .then(response => response.data);
};

const create = newPerson => {
    const request = axios.post(basedUrl, newPerson);
    return request
        .then(response => response.data)
};

const deletePerson = (id, person) => {
    const request = axios.delete(`${basedUrl}/${id}`, person);
    return request
        .then(response => response.data)

};

const updatePerson = (id, changedPerson) => {
    const request = axios.put(`${basedUrl}/${id}`, changedPerson);
    return request
        .then(response => response.data)
};

export default {
    getAll,
    create,
    deletePerson,
    updatePerson
};