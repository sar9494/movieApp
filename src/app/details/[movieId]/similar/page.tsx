"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header, Footer, MovieBox, UsePagination } from "@/components";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { getDetailInfo, getMovieSimilarInfo } from "@/utils/requests";
import { MovieType } from "../page";

export default function Movie() {
  const { theme } = useTheme();
  const [similarMovie, setSimilarMovie] = useState<Array<MovieType>>();
  const { movieId } = useParams();
  const [step, setStep] = useState(1);
  const getMovieInfo = async () => {
    const response2 = await getMovieSimilarInfo(movieId, "/similar", step);
    setSimilarMovie(response2.data.results);
  };
  useEffect(() => {
    getMovieInfo();
  }, [step]);
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Header />
      <div className="w-[1200px] flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <p className="text-[26px] font-semibold">More like this</p>
        </div>
        <div className="flex gap-7 flex-wrap">
          {similarMovie?.map((movie, index) => (
            <MovieBox
              key={index}
              url={movie.poster_path}
              rating={movie.vote_average}
              title={movie.title}
              className="w-[200px]"
              imgHeigth="h-[300px]"
              id={movie.id}
            />
          ))}
        </div>
      </div>
      <UsePagination step={step} setStep={setStep} />
      <Footer />
    </div>
  );
}
