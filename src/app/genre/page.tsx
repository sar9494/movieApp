"use client";
import {
  Footer,
  Genres,
  MovieBox,
  Header,
  UsePagination,
} from "@/components/index";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
type movie = {
  title: string;
  poster_path: string;
  vote_average: number;
  id: string | string[] | undefined;
};
export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [upcomingMovie, setUpcomingMovie] = useState<Array<movie>>([]);
  const searchParams = useSearchParams();
  console.log(searchParams.get("genreslds"));

  const filteredMovie = async () => {
    const genre = await fetch(
      `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${searchParams.get(
        "genreslds"
      )}&page=${step}&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`
    );
    const genred = await genre.json();
    console.log(genred);
    setUpcomingMovie(genred.results);
  };

  useEffect(() => {
    filteredMovie();
  }, [searchParams, step]);
  // useEffect(()=>{
  //   const params = new URLSearchParams(searchParams);
  //   params.set("value", searchValue);
  //   router.push(`/search?${params.toString()}`);
  // })
  return (
    <div className="flex items-center flex-col w-screen gap-10">
      <Header  />

      <div className="w-[1200px] flex">
        <div>
          <p className="text-3xl">
            <b>Search Filter</b>
          </p>
          <Genres className="border-none flex w-[480px]" pageName="genre" />
        </div>
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
        </div>
      </div>
      <UsePagination step={step} setStep={setStep}  />
      <Footer />
    </div>
  );
}
