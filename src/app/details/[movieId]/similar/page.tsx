"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { MovieBox, UsePagination } from "@/components";
import { useEffect, useState } from "react";
import { getMovieSimilarInfo } from "@/utils/requests";
import { MovieType } from "@/types";

export default function Movie() {
  const [similarMovie, setSimilarMovie] = useState<Array<MovieType>>();
  const { movieId } = useParams();
  const [step, setStep] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const getMovieInfo = async () => {
    const response2 = await getMovieSimilarInfo(movieId, "/similar", step);
    setSimilarMovie(response2.data.results);
  };
  useEffect(() => {
    getMovieInfo();
    const params = new URLSearchParams(searchParams);
    params.set("page", step?.toString() || "1");
    router.push(`/details/${movieId}/similar?${params.toString()}`);
  }, [step]);
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="max-w-[1200px] flex flex-col gap-5 p-5">
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
              className="w-[157px] lg:w-[230px]"
              imgHeigth="h-[234px] lg:h-[335px]"
              id={movie.id}
            />
          ))}
        </div>
      </div>
      <UsePagination step={step} setStep={setStep} />
    </div>
  );
}
