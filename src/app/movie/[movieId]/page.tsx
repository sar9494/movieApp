"use client";
import { useParams } from "next/navigation";
import { Header, Footer } from "@/components";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { StarIcon ,PlayIcon } from "@/icons";
import {Button} from "@/components/ui"
type Movie = {
  title: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  overview: string;
  genres: Array<string>;
  vote_count: number;
};
export default function Movie() {
  const { setTheme, theme } = useTheme();
  const [movie, setMovie] = useState<Movie>();
  const { movieId } = useParams();
  const getMovieInfo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`
    );
    const result = await response.json();
    console.log(result);
    setMovie(result);
  };
  useEffect(() => {
    getMovieInfo();
    console.log(movie?.runtime);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Header />
      <div className="w-[1100px] flex flex-col gap-8">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-4xl">{movie?.title}</p>
            <div className="flex">
            <p>
              {movie?.release_date} · PG · 
            </p>
            <p>
                {Math.floor(movie?.runtime!/60) }h {movie?.runtime!%60}m
            </p>
            </div>
            
          </div>
          <div>
            <p>Rating</p>
            <div className="flex items-center justify-center gap-2">
              <StarIcon />
              <div className="text-sm">
                <div className="flex">
                  <p>
                    <b>{movie?.vote_average}</b>
                  </p>
                  <p className="opacity-70">/10</p>
                </div>
                <p className="opacity-70">{movie?.vote_count}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-10">
            <img className="w-[290px]" src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} alt="" />
            <div className="relative w-full">
                <img src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} alt="" />
                <div className="w-full bg-black bg-opacity-50 h-full absolute top-0">
                    <Button></Button>
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
