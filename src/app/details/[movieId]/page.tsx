"use client";
import { useParams } from "next/navigation";
import { MovieBox, PlayButton, SeeMore } from "@/components";
import { useEffect, useState } from "react";
import { getDetailInfo, getMovieSimilarInfo } from "@/utils/requests";
import { MovieType } from "@/types";
import { StarIcon } from "lucide-react";
import { MoviePages } from "@/components/skeleton/MoviePages";

type Team = {
  cast: Array<{ name: string }>;
  crew: string;
};
export default function Movie() {
  const [movie, setMovie] = useState<MovieType>();
  const [similarMovie, setSimilarMovie] = useState<Array<MovieType>>();
  const [team, setTeam] = useState<Team>({} as Team);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  const getMovieInfo = async () => {
    const response = await getDetailInfo(movieId, "");
    setMovie(response.data);
    const response2 = await getMovieSimilarInfo(movieId, "/similar", 1);
    setSimilarMovie(response2.data.results);
    const response4 = await getDetailInfo(movieId, "/credits");
    setTeam({
      crew: response4.data.crew[2].name,
      cast: response4.data.cast,
    });
  };
  useEffect(() => {
    getMovieInfo();
  }, []);

  return (
    <div>
      {
        isLoading?(<div className=" w-full py-5"><MoviePages size={20}/></div>):
        (<div className="flex flex-col items-center justify-center gap-5">
          <div className="w-full flex flex-col gap-8 p-5">
            <div className="flex justify-between w-full">
              <div>
                <p className="font-bold lg:text-4xl text-3xl w-[250px] lg:w-fit">
                  {movie?.title}
                </p>
                <div className="flex">
                  <p>{movie?.release_date} · PG ·</p>
                  <p>
                    {Math.floor(movie?.runtime! / 60)}h {movie?.runtime! % 60}m
                  </p>
                </div>
              </div>
              <div>
                <p className="lg:block hidden">Rating</p>
                <div className="flex items-center justify-center gap-2">
                  <StarIcon color="yellow" fill="yellow" size={24} />
                  <div className="text-sm">
                    <div className="flex">
                      <p>
                        <b>{movie?.vote_average}</b>
                      </p>
                      <p className="opacity-70">/10</p>
                    </div>
                    <p className="opacity-70">{movie?.vote_count}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-10">
              <img
                className="hidden lg:block lg:w-[290px] rounded-lg"
                src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                alt=""
              />
              <div className="relative w-[375px] lg:w-fit">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                  alt=""
                  className="rounded-lg h-[211px] lg:h-[428px] w-full "
                />
                <div className="w-full bg-black bg-opacity-50 h-full absolute top-0 p-5 lg:p-10 flex items-end">
                  <PlayButton id={movie?.id} pageName="" />
                </div>
              </div>
            </div>
            <div className="flex w-full gap-10">
              <img
                src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                className="w-[100px] h-[148px] rounded-md lg:hidden"
              />
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 font-bold  flex-wrap">
                  {movie?.genres.map((el, index) => {
                    return (
                      <div key={index} className="border w-fit p-1 rounded-2xl">
                        {el.name}
                      </div>
                    );
                  })}
                </div>
                <p>{movie?.overview}</p>
              </div>
            </div>
    
            <div className="flex border-b-2 py-2">
              <p className="w-[64px] ">
                <b>Director</b>
              </p>
              <p className="pl-12">{team.crew}</p>
            </div>
            <div className="flex border-b-2 py-2">
              <p className="w-[64px] ">
                <b>Writers</b>
              </p>
            </div>
            <div className="flex border-b-2 py-2">
              <p className="w-[64px] pr-5">
                <b>Stars</b>
              </p>
              <div className="flex lg:gap-3 flex-wrap pl-12">
                {team.cast
                  ?.slice(0, 5)
                  .map((el: { name: string }, index: number) => (
                    <div className="flex gap-3" key={index}>
                      <p key={index}> {el.name}</p>
                      <p>{index !== 4 && "·"}</p>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[26px] font-semibold">More like this</p>
              <SeeMore url={`/details/${movieId}/similar`} />
            </div>
            <div className="flex gap-7 flex-wrap">
              {similarMovie?.slice(0, 5).map((movie, index) => (
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
        </div>)
      }
    </div>
    
  );
}
