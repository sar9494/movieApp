"use client";
import {
  Footer,
  GenreList,
  MovieBox,
  Header,
  UsePagination,
} from "@/components/index";
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
    <div className="flex items-center flex-col w-screen gap-10">
      <Header />

      <div className="w-[1200px] flex min-h-[calc(100vh-420px)]">
        <div>
          <p className="text-3xl">
            <b>Search Filter</b>
          </p>
          <GenreList pageName="genre" />
        </div>
        {upcomingMovie.length != 0 ? (
          <div className="flex shrink-0 flex-wrap w-[800px] gap-6 overflow-y-auto">
            {upcomingMovie.map((el, index) => (
              <MovieBox
                key={index}
                title={el.title}
                url={el.poster_path}
                rating={el.vote_average}
                id={el.id}
                className="w-[165px]"
                imgHeigth="h-[205px]"
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
      <Footer />
    </div>
  );
}