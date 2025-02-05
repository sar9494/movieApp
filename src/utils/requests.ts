import axios from "axios";
const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

export const getMoviesInfo = async (page: number, name: string) => {
  return axios.get(
    `${BASE_URL}${name}?language=en-US&page=${page}&api_key=${API_KEY}`
  );
};

export const getMovieSimilarInfo = async (
  id: string | string[] | undefined,
  type: string,
  page: number
) => {
  return axios.get(
    `${BASE_URL}/movie/${id}${type}?language=en-US&page=${page}&api_key=${API_KEY}`
  );
};
export const getDetailInfo = (
  id: string | string[] | undefined,
  type: string
) => {
  return axios.get(
    `${BASE_URL}/movie/${id}${type}?language=en-US&api_key=${API_KEY}`
  );
};
///movie/${id}/credits?language=en-US
{
  /* {isClick&&(
              <div className="absolute w-screen h-screen bg-black bg-opacity-70 top-0 flex items-center justify-center" 
              onClick={exitTrailerHandler} >
                <Button className="bg-white pointer" onClick={exitTrailerHandler}>click</Button>
                </div>
            )} */
}
