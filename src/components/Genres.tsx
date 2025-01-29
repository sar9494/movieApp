import { Button } from "./ui";
import { RightIcon } from "@/icons/index";
import { useEffect, useState } from "react";
const GENRES: string[] = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "Game-Show",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Reality-TV",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Talk-Show",
  "Thriller",
  "War",
  "Western",
];
type props = {
  theme: string;
  className: string;
};
type genre = {
  name: string;
  id: number;
};
export const Genres = (props: props) => {
  const { theme, className } = props;
  const [genre, setGenre] = useState<Array<genre>>();
  const [chosenGenre,setChosenGenre] =useState <Array<number>>()

  const getMovieInfo = async () => {
    try {
      const response1 = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf"
      );
      const result1 = await response1.json();
      setGenre(result1.genres);
      //   setUpcomingMovie(result1.results)
    } catch (e) {
      console.log(e);
    }
  };
  const onClick = (id:number) => {

  };

  useEffect(() => {
    getMovieInfo();
  }, [genre]);

  return (
    <div
      className={`   gap-3 flex-wrap top-[80px] bg-white dark:bg-black  rounded-xl border flex-col ${className}`}
    >
      <div>
        <p className="text-3xl">
          <b>Genres</b>
        </p>
        <p>See lists of movies by genre</p>
        <hr />
      </div>
      <div className=" w-full flex gap-3 flex-wrap ">
        {genre?.map((el:genre, index) => (
          <Button
            key={index}
            className="bg-white dark:bg-black w-fit hover:opacity-80 border p-1 flex items-center h-[20px]"
          >
            <p className="text-black dark:text-white">{el.name}</p>
            <RightIcon color={theme == "light" ? "black" : "white"} />
          </Button>
        ))}
      </div>
    </div>
  );
};
