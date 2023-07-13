import axios from "axios";

const url = 'https://api.thecatapi.com/v1/breeds'

axios.defaults.headers.common["x-api-key"] = "live_3Nh51idfPfglSxqwJbq0mBBoIJ8qKGcq90eh15aguEY5Sl8PpCOW3yPgeOpbwsIg";
// const api_key = "live_3Nh51idfPfglSxqwJbq0mBBoIJ8qKGcq90eh15aguEY5Sl8PpCOW3yPgeOpbwsIg";

function fetchBreeds() {
    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
        })
};

function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
        })
 }
;

export { fetchBreeds, fetchCatByBreed};


