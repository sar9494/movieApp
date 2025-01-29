import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useEffect } from "react";
import { MovieBox } from "./index";
type movie = {
  title: string;
  poster_path: string;
  vote_average: number;
};
export const PopularMovie = () => {
  const [step, setStep] = useState<number>(1);
  const [movies, setMovies] = useState<Array<movie>>();
  const getMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${step}&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`
    );
    const result = await response.json();
    setMovies(result.results);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      <div className="flex flex-wrap w-[1200px] gap-3">
        {movies?.map((el: movie, index) => (
          <MovieBox
            key={index}
            title={el.title}
            url={el.poster_path}
            rating={el.vote_average}
            className="w-[230px]"
          />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => {
                step != 1 && setStep(step - 1);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {step}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              {step+1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">{step+2}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="/"
              onClick={() => {
                setStep(step + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
