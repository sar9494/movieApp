"use client";
import {
  Footer,
  Genres,
  MovieBox,
  Header,
  UsePagination,
} from "@/components/index";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { getMoviesInfo } from "@/utils/requests";

type movie = {
  title: string;
  poster_path: string;
  vote_average: number;
  id: string | string[] | undefined;
};
export default function Home() {
  const {  theme } = useTheme();
  const [step, setStep] = useState<number>(1);
  const [upcomingMovie, setUpcomingMovie] = useState<Array<movie>>([]);

  const getMovieInfo = async () => {
    try {
      const response1 = await getMoviesInfo(step,"/movie/now_playing")
      

      setUpcomingMovie(response1.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMovieInfo();
  }, [step]);
  return (
    <div className="flex items-center flex-col w-screen gap-10">
      <Header/>
      <div className="w-[1200px] flex">
        <div>
          <p className="text-3xl">
            <b>Search Filter</b>
          </p>
          <Genres className="border-none flex w-[480px]" />
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
      <UsePagination step={step} setStep={setStep} />
      <Footer />
    </div>
  );
}
