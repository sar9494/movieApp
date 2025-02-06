"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header, Footer, MovieBox } from "@/components";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { StarIcon, PlayIcon, SeeMoreIcon } from "@/icons";
import { Button } from "@/components/ui";
import { getDetailInfo, getMovieSimilarInfo } from "@/utils/requests";
import ReactPlayer from 'react-player'

export type MovieType = {
  title: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  overview: string;
  genres: Array<Genre>;
  vote_count: number;
  id: string | string[] | undefined;
};
type Genre = {
  id: number;
  name: string;
};
type Cast = {
  name: string;
};
type Team = {
  cast: Array<Cast>;
  crew: string;
  videoUrl: string;
};
export default function Movie() {
  const { theme } = useTheme();
  const [movie, setMovie] = useState<MovieType>();
  const [similarMovie, setSimilarMovie] = useState<Array<MovieType>>();
  const [team, setTeam] = useState<Team>({} as Team);
  const [isClick, setIsClick] = useState(false);
  const { movieId } = useParams();

  const getMovieInfo = async () => {
    const response = await getDetailInfo(movieId, "");
    setMovie(response.data);

    const response2 = await getMovieSimilarInfo(movieId, "/similar", 1);
    setSimilarMovie(response2.data.results);

    const response3 = await getDetailInfo(movieId, "/videos");
    const response4 = await getDetailInfo(movieId, "/credits");
    response3.data.results.map((el:{name:string,key:string})=>{
      if(el.name.includes("railer")){
        setTeam({crew:response4.data.crew[2].name,cast:response4.data.cast,videoUrl: el.key });
      }
    })
  };
  const watchTrailerHandler = () => {
    !isClick && setIsClick(true);
  };
  const exitTrailerHandler = () => {
    isClick && setIsClick(false);
  };
  
  useEffect(() => {
    getMovieInfo();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="flex flex-col items-center justify-center gap-5">
        <Header />
        <div className="w-[1100px] flex flex-col gap-8">
          <div className="flex justify-between">
            <div>
              <p className="font-bold text-4xl">{movie?.title}</p>
              <div className="flex">
                <p>{movie?.release_date} · PG ·</p>
                <p>
                  {Math.floor(movie?.runtime! / 60)}h {movie?.runtime! % 60}m
                </p>
              </div>
            </div>
            <div>
              <p>Rating</p>
              <div className="flex items-center justify-center gap-2">
                <StarIcon />
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
              className="w-[290px] rounded-lg"
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
              alt=""
            />
            <div className="relative w-full">
              <img
                src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                alt=""
                className="rounded-lg"
              />
              <div className="w-full bg-black bg-opacity-50 h-full absolute top-0 p-10 flex items-end">
                <div
                  className="flex items-center gap-2"
                  onClick={watchTrailerHandler}
                >
                  <Button className="rounded-full w-fit h-fit p-3 flex items-center justify-center ">
                    <PlayIcon color="black" />
                  </Button>
                  <p>Play trailer</p>
                  <p>time</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 font-bold w-[1200px] flex-wrap">
            {movie?.genres.map((el, index) => {
              return (
                <div key={index} className="border w-fit p-1 rounded-2xl">
                  {el.name}
                </div>
              );
            })}
          </div>
          <p>{movie?.overview}</p>
          <div className="flex border-b-2 py-2">
            <p className="w-[120px]">
              <b>Director</b>
            </p>
            <p>{team.crew}</p>
          </div>
          <div className="flex border-b-2 py-2">
            <p className="w-[120px]">
              <b>Writers</b>
            </p>
          </div>
          <div className="flex border-b-2 py-2">
            <p className="w-[120px]">
              <b>Stars</b>
            </p>
            <div className="flex gap-3">
              {team.cast?.slice(0, 5).map((el: Cast, index: number) => (
                <div className="flex gap-3" key={index}>
                  <p key={index}> {el.name}</p>
                  <p>{index !== 4 && "·"}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[26px] font-semibold">More like this</p>
            <Link href={`/details/${movieId}/similar`}>
              <div className="flex items-center gap-2">
                <p>See more</p>
                <SeeMoreIcon color={theme == "light" ? "black" : "white"} />
              </div>
            </Link>
          </div>
          <div className="flex gap-7">
            {similarMovie?.slice(0, 5).map((movie, index) => (
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
        <Footer />
      </div>
      {isClick && (
        <div
          className="absolute w-screen h-screen bg-black bg-opacity-70 top-0 flex items-center justify-center"
          onClick={exitTrailerHandler}
        >
          <ReactPlayer   url={`https://www.youtube.com/watch?v=${team.videoUrl}`}/>
        </div>
      )}
    </div>
  );
}
