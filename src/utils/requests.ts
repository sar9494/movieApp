import axios from "axios"
const BASE_URL = process.env.BASE_URL;
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;
const API_KEY = process.env.API_KEY;

const getMoviesInfo = (page:number,name:string) =>{
    return axios.get(`${BASE_URL}/movie/${name}?language=en-US&page=${page}&api_key=${API_KEY}`)
}

