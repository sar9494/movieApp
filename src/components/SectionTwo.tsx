import { MovieBox } from "./index";
import { SeeMoreIcon } from "@/icons/index";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";


type props = {
  name: string;
  title: string;
};
type movie = {
  title: string;
  poster_path: string;
  vote_average: number;
  id:string | string[] | undefined;
};
export const SectionTwo = (props: props) => {
  const {theme} =useTheme()

  const { name, title } = props;
  const [movie,setMovie]= useState<Array<movie>>([])

  const router = useRouter();
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
    <div className="flex flex-col w-[1250px] gap-4 overflow-y-auto mt-[50px]">
      <div className="flex items-center justify-between ">
        <h1 className="text-4xl">
          <b>{name}</b>
        </h1>
        <Link href={`/type/${title}`}>
          <div
            className="flex items-center gap-2"
          >
            <p>See more</p>
            <SeeMoreIcon color={theme == "light" ? "black" : "white"} />
          </div>
        </Link>
      </div>
      <div className="flex shrink-0 flex-wrap w-full gap-6 overflow-y-auto">
        {movie.slice(0, 10).map((movie, index) => (
          <MovieBox
            key={index}
            title={movie.title}
            url={movie.poster_path}
            rating={movie.vote_average}
            id={movie.id}
            className="w-[230px]"
            imgHeigth="h-[345px]"
          />
        ))}
      </div>
    </div>
  );
};
