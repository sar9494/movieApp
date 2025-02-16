"use client";
import { GenreList, MovieBox, UsePagination } from "@/components/index";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MovieType } from "@/types";

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [upcomingMovie, setUpcomingMovie] = useState<Array<MovieType>>([]);
  const searchParams = useSearchParams();

  const filteredMovie = async () => {
    const genre = await fetch(
      `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${searchParams.get(
        "genreslds"
      )}&page=${step}&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`
    );
    const genred = await genre.json();
    setUpcomingMovie(genred.results);
  };
  useEffect(() => {
    filteredMovie();
  }, [searchParams, step]);
  return (
    <div className="flex items-center flex-col w-screen ">
      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row p-5">
        <div className="flex flex-col  gap-3">
          <p className="text-3xl">
            <b>Search Filter</b>
          </p>
          <div>
            <div className="py-3">
              <p className={`text-3xl`}>
                <b>Genres</b>
              </p>
              <p>See lists of movies by genre</p>
            </div>
            <GenreList pageName="genre" />
          </div>
        </div>
        {upcomingMovie.length != 0 ? (
          <div className="flex shrink-0 flex-wrap w-full lg:w-[800px]  gap-6 overflow-y-auto">
            {upcomingMovie.map((el, index) => (
              <MovieBox
                key={index}
                title={el.title}
                url={el.poster_path}
                rating={el.vote_average}
                id={el.id}
                className="w-[157px] lg:w-[165px]"
                imgHeigth="h-[234px] lg:h-[244px]"
              />
            ))}
            <UsePagination step={step} setStep={setStep} />
          </div>
        ) : (
          <div className="w-[1200px] flex items-center justify-center border m-3 rounded-xl py-10 h-fit">
            <b>No results found.</b>{" "}
          </div>
        )}
      </div>
    </div>
  );
}
