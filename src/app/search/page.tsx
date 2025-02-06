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
  genres: string[];
};
export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [upcomingMovie, setUpcomingMovie] = useState<Array<movie>>([]);
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  console.log(searchParams.get("genreslds"));

  const filteredMovie = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=${step}&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`
    );
    const result = await response.json();
    console.log(result);
    setUpcomingMovie(result.results);
  };

  const handleChange = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    filteredMovie();
  }, [searchValue, step]);

  return (
    <div className="flex items-center flex-col w-screen gap-10">
      <Header onChange={handleChange} />
      <div className="w-[1200px] flex flex-row-reverse">
        <div>
          <p className="text-3xl">
            <b>Search Filter</b>
          </p>
          <Genres className="border-none flex w-[480px]" pageName="search" />
        </div>
        {
          searchValue.length==0?(<div></div>):
          (<div  className="flex shrink-0 flex-wrap w-[800px] gap-6 overflow-y-auto">
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
          </div>)
        }
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
      </div>
      <Footer />
    </div>
  );
}
