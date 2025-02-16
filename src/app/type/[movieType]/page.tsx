"use client";

import { MovieType as GeneralMovieType } from "@/types/index";
import { useState, useEffect } from "react";
import { MovieBox, UsePagination } from "@/components";
import { useParams, useRouter } from "next/navigation";

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const router = useRouter();
  const { movieType } = useParams();
  const [movies, setMovies] = useState<Array<GeneralMovieType>>();
  const getMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieType}?language=en-US&page=${step}&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`
    );
    const result = await response.json();
    setMovies(result.results);
  };

  useEffect(() => {
    getMovies();
    const params = new URLSearchParams();
    params.set("page", step.toString());
    router.push(`/type/${movieType}?${params.toString()}`);
    router.refresh();
  }, [step]);
  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-10 p-5 ">
        <h1 className="text-3xl lg:text-4xl w-full">
          <b>{movieType === "upcoming" && "Upcoming"}</b>
          <b>{movieType === "top_rated" && "Top Rated"}</b>
          <b>{movieType === "popular" && "Popular"}</b>
        </h1>
        <div className="flex flex-wrap gap-3">
          {movies?.map((el: GeneralMovieType, index) => (
            <MovieBox
              key={index}
              title={el.title}
              url={el.poster_path}
              rating={el.vote_average}
              className="w-[157px] lg:w-[230px]"
              imgHeigth="h-[234px] lg:h-[335px]"
              id={el.id}
            />
          ))}
        </div>
        <UsePagination step={step} setStep={setStep} />
      </div>
    </div>
  );
}
