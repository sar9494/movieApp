"use client";
import { useParams } from "next/navigation";
import { Header, Footer, MovieBox, PlayButton ,SeeMore} from "@/components";
import { useEffect, useState } from "react";
import { StarIcon } from "lucide-react";
import { getDetailInfo, getMovieSimilarInfo } from "@/utils/requests";
import { MovieType } from "@/types";

type Team = {
  cast: Array<{name: string}>;
  crew: string;
};
export default function Movie() {
  const [movie, setMovie] = useState<MovieType>();
  const [similarMovie, setSimilarMovie] = useState<Array<MovieType>>();
  const [team, setTeam] = useState<Team>({} as Team);
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
                <PlayButton id={movie?.id} />
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
              {team.cast?.slice(0, 5).map((el: {name:string}, index: number) => (
                <div className="flex gap-3" key={index}>
                  <p key={index}> {el.name}</p>
                  <p>{index !== 4 && "·"}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[26px] font-semibold">More like this</p>
            <SeeMore url={`/details/${movieId}/similar`}/>
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
    </div>
  );
}