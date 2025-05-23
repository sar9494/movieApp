import axios from "axios";
const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

export const getMoviesInfo = async (page: number, name: string) => {
  console.log(BASE_URL,API_KEY);
  
  return axios.get(
    `${BASE_URL}${name}?language=en-US&page=${page}&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`
  );
};

export const getMovieSimilarInfo = async (
  id: string | string[] | undefined,
  type: string,
  page: number
) => {
  return axios.get(
    `${BASE_URL}/movie/${id}${type}?language=en-US&page=${page}&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`
  );
};
export const getDetailInfo = (
  id: string | string[] | undefined,
  type: string
) => {
  return axios.get(
    `${BASE_URL}/movie/${id}${type}?language=en-US&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`
  );
};
