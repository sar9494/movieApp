"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  MovieBox,
  Header,
  Footer,
  UsePagination,
} from "../../components/index";
type movie = {
  title: string;
  poster_path: string;
  vote_average: number;
};
export default function Home() {
  const [step, setStep] = useState<number>(1);
  const { setTheme, theme } = useTheme();
  const [movies, setMovies] = useState<Array<movie>>();
  const getMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${step}&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`
    );
    const result = await response.json();
    setMovies(result.results);
  };
  useEffect(() => {
    getMovies();
  }, [step]);
  return (
    <div className="flex flex-col gap-5 items-center">
      <Header themes={theme} setThemes={setTheme} />
      <div className="flex flex-wrap w-[1200px] gap-3">
        {movies?.map((el: movie, index) => (
          <MovieBox
            key={index}
            title={el.title}
            url={el.poster_path}
            rating={el.vote_average}
            className="w-[230px]"
            imgHeigth="h-[345px]"
          />
        ))}
      </div>
      <UsePagination step={step} setStep={setStep} />

      <Footer />
    </div>
  );
}
