"use client";
import { Button } from "./ui";
import { RightIcon, RemoveIcon } from "@/icons/index";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { getMoviesInfo } from "@/utils/requests";

type props = {
  className: string;
};
type genre = {
  name: string;
  id: number;
};
type IsClick = {
  id: number;
  clicked: boolean;
};
export const Genres = (props: props) => {
  const { className } = props;
  const [genre, setGenre] = useState<Array<genre>>();
  const [chosenGenres, setChosenGenres] = useState<Array<number>>([]);
  const [isClick, setIsClick] = useState<Array<IsClick>>([]);
  const { theme } = useTheme();

  const getMovieInfo = async () => {
    try {
      const response1 = await getMoviesInfo(1, "/genre/movie/list");
      setGenre(response1.data.genres);
    } catch (e) {
      console.log(e);
    }
  };
  const onClick = (id: number) => {
    let count = 0;
    let ind = 0;

      setChosenGenres([...chosenGenres, id]);
      console.log(id);

    ///discover/movie?language=en&with_genres=${genreIds}&page=${page}
  };
  const getGenreMovie=async(id:number)=>{
    try {
      const response1 = await fetch(`https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${id}&page=${1}`)
      const result = await response1.json()
      // setGenre(result.results);
    } catch (e) {
      console.log(e);
    }
  } 
  console.log(chosenGenres?.length);
  console.log(chosenGenres);
  

  useEffect(() => {
    getMovieInfo();
  }, []);

  return (
    <div
      className={` gap-3 flex-wrap top-[80px] bg-white dark:bg-black  rounded-xl border flex-col ${className}`}
    >
      <div>
        <p className="text-3xl">
          <b>Genres</b>
        </p>
        <p>See lists of movies by genre</p>
        <hr />
      </div>
      <div className=" w-full flex gap-3 flex-wrap ">
        {genre?.map((el: genre, index) => (
          <Link
            href={`/genre?page=1&genreslds=${el.id}`}
            key={index}
            onClick={() => onClick(el.id)}
          >
            <Button className="bg-white dark:bg-black w-fit hover:opacity-80 border p-1 flex items-center justify-center h-[20px]">
              <p className="text-black dark:text-white">{el.name}</p>
              {isClick ? (
                <RemoveIcon color={theme == "light" ? "black" : "white"} />
              ) : (
                <RightIcon color={theme == "light" ? "black" : "white"} />
              )}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};
