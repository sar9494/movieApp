import { MovieBox,SeeMore } from "./index";
import { useEffect, useState } from "react";
import { MovieType } from "@/types";

type props = {
  name: string;
  title: string;
};
export const SectionTwo = (props: props) => {
  const { name, title } = props;
  const [movie,setMovie]= useState<Array<MovieType>>([])

  const getMovieInfo = async () => {
    try {
      const response1 = await fetch(
       ` https://api.themoviedb.org/3/movie/${title}?language=en-US&page=1&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`
      );
      const result1 = await response1.json();
      setMovie(result1.results)
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(()=>{
    getMovieInfo()
  },[])

  return (
    <div className="flex flex-col w-full xl:w-[1300px] gap-4 overflow-y-auto xl:mt-[50px] p-5">
      <div className="flex items-center justify-between ">
        <h1 className="text-3xl">
          <b>{name}</b>
        </h1>
        <SeeMore url={`/type/${title}`}/>
      </div>
      <div className="flex shrink-0 flex-wrap w-full gap-6 overflow-y-auto">
        {movie.slice(0, 10).map((movie, index) => (
          <MovieBox
            key={index}
            title={movie.title}
            url={movie.poster_path}
            rating={movie.vote_average}
            id={movie.id}
            className="w-[157px] lg:w-[230px]"
            imgHeigth="h-[234px] lg:h-[335px]"
          />
        ))}
      </div>
    </div>
  );
};