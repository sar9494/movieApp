import axios from "axios";
const BASE_URL = process.env.BASE_URL;
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;
const API_KEY = process.env.API_KEY;
const MOVIE_DETAILS_BASE = process.env.MOVIE_DETAILS_BASE;

export const getMoviesInfo = async (page: number, name: string) => {
  return axios.get(
    `${BASE_URL}${name}?language=en-US&page=${page}&api_key=${API_KEY}`
  );
};

export const getImage = (url: string) => {
  return `${IMAGE_BASE_URL}${url}`;
};

export const getMovieDetailInfo = async (
  id: number,
  page: number,
  type: string
) => {
  return axios.get(
    `${BASE_URL}/movie/${id}/${type}?language=en-US&page=${page}&api_key=${API_KEY}`
  );
};
