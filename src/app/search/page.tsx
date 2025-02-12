"use client";
import {
  Footer,
  MovieBox,
  Header,
  UsePagination,
  GenreList,
} from "@/components/index";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MovieType } from "@/types";

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const router = useRouter();
  const [upcomingMovie, setUpcomingMovie] = useState<Array<MovieType>>([]);
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(() => {
    return searchParams.get("value") || "";
  });
  const chosenGenre = searchParams.get("genreslds")?.split(",");

  const filteredMovie = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`
    );
    const result = await response.json();
    setUpcomingMovie(result.results);
  };
  const handleChange = (value: string) => {
    setSearchValue(value);
  };
  useEffect(() => {
    filteredMovie();
    const params = new URLSearchParams(searchParams);
    params.set("value", searchValue);
    router.push(`/search?${params.toString()}`);
    params.set("page", step.toString());
    router.push(`/search?${params.toString()}`);
    router.refresh;
  }, [searchValue, step]);

  return (
    <div className="flex items-center flex-col w-screen gap-10  ">
      <Header onChange={handleChange} place={true} />
      <div className="w-[1200px] flex flex-row-reverse min-h-[calc(100vh-420px)] ">
        <div>
          <p className="text-3xl">
            <b>Search Filter</b>
          </p>
          <GenreList pageName="search" />
        </div>
        {searchValue.length == 0 ? (
          <div className="w-[1200px] flex items-center justify-center border m-3 rounded-xl py-10 h-fit">
            <b>No results found.</b>{" "}
          </div>
        ) : (
          <div className="flex shrink-0 flex-wrap w-[800px] gap-6 overflow-y-auto">
            {upcomingMovie.map((el, index) => {
              let isInclude = false;
              chosenGenre?.map((num) => {
                if (el.genre_ids.join(",").includes(num)) {
                  isInclude = true;
                }
              });
              if (
                chosenGenre?.join().length == 0 ||
                isInclude ||
                chosenGenre == null
              ) {
                return (
                  <MovieBox
                    key={index}
                    title={el.title}
                    url={el.poster_path}
                    rating={el.vote_average}
                    id={el.id}
                    className="w-[165px]"
                    imgHeigth="h-[205px]"
                  />
                );
              }
            })}
            <UsePagination step={step} setStep={setStep} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}