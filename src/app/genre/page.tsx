"use client";
import {
  Footer,
  Genres,
  MovieBox,
  Header,
  UsePagination,
} from "../../components/index";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type props = {
  theme: string;
};
type movie = {
  title: string;
  poster_path: string;
  vote_average: number;
};
export default function Home() {
  const { setTheme, theme } = useTheme();
  const [step, setStep] = useState<number>(1);
  const [upcomingMovie, setUpcomingMovie] = useState<Array<movie>>([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieInfo = async () => {
    try {
      const response1 = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${step}&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`
      );
      const result1 = await response1.json();
      console.log(result1.results);
      

      setUpcomingMovie(result1.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMovieInfo();
  }, [step]);
  return (
    <div className="flex items-center flex-col w-screen gap-10">
      <Header themes={theme} setThemes={setTheme} />
      <div className="w-[1200px] flex">
        <div>
          <p className="text-3xl">
            <b>Search Filter</b>
          </p>
          <Genres theme={theme} className="border-none flex w-[480px]" />
        </div>
        <div className="flex shrink-0 flex-wrap w-[800px] gap-6 overflow-y-auto">
          {upcomingMovie.map((el, index) => (
            <MovieBox
              key={index}
              title={el.title}
              url={el.poster_path}
              rating={el.vote_average}
              className="w-[165px]"
            imgHeigth="h-[205px]"
            />
          ))}
        </div>
      </div>
      <UsePagination step={step} setStep={setStep} />

      <Footer />
    </div>
  );
}
