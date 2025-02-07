"use client";

import { useState, useEffect } from "react";
import {
  MovieBox,
  Header,
  Footer,
  UsePagination,
} from "../../../components"
import { useParams ,useRouter } from "next/navigation";
type movie = {
  title: string;
  poster_path: string;
  vote_average: number;
  id:string | string[] | undefined,
};
export default function Home() {
  const [step, setStep] = useState<number>(1);
  const router = useRouter()
    const { movieType } = useParams();
  const [movies, setMovies] = useState<Array<movie>>();
  const getMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieType}?language=en-US&page=${step}&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`
    );
    const result = await response.json();
    setMovies(result.results);
  };
  console.log(movieType);
  
  useEffect(() => {
    getMovies();
    router.refresh()
  }, [step]);
  return (
    <div className="flex flex-col gap-5 items-center">
      <Header/>
      <h1 className="text-4xl w-[1200px]">
          
          <b>{movieType==="upcoming"&&("Upcoming")}</b>
          <b>{movieType==="top_rated"&&("Top Rated")}</b>
          <b>{movieType==="popular"&&("Popular")}</b>
        </h1>
      <div className="flex flex-wrap w-[1200px] gap-3">
        {movies?.map((el: movie, index) => (
          <MovieBox
            key={index}
            title={el.title}
            url={el.poster_path}
            rating={el.vote_average}
            className="w-[230px]"
            imgHeigth="h-[345px]"
            id={el.id}
          />
        ))}
      </div>
      <UsePagination step={step} setStep={setStep} />

      <Footer />
    </div>
  );
}
