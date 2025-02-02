"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header, Footer } from "@/components";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { StarIcon, PlayIcon, SeeMoreIcon } from "@/icons";
import { Button } from "@/components/ui";
import { getImage, getMoviesInfo, getMovieDetailInfo } from "@/utils/requests";
type Movie = {
  title: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  overview: string;
  genres: Array<string>;
  vote_count: number;
};
export default function Movie() {
  const { setTheme, theme } = useTheme();
  const [movie, setMovie] = useState<Movie>();
  const [similarMovie, setSimilarMovie] = useState([]);
  const { movieId } = useParams();
  const getMovieInfo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`
    );
    // /movie/${id}/similar?language=en-US&page=1
    ///movie/now_playing?language=en-US&page=1
    const result = await response.json();
    console.log(result);
    setMovie(result);
    // const response2 = getMoviesInfo(1, `${movieId}similar`);
    // console.log((await response2).data);
  };
  useEffect(() => {
    getMovieInfo();
    console.log(movie?.runtime);
  }, []);
  return (
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
            src={getImage(movie?.poster_path!)}
            alt=""
          />
          <div className="relative w-full">
            <img
              src={getImage(movie?.backdrop_path!)}
              alt=""
              className="rounded-lg"
            />
            <div className="w-full bg-black bg-opacity-50 h-full absolute top-0 p-10 flex items-end">
              <div className="flex items-center gap-2">
                <Button className="rounded-full w-fit h-fit p-3 flex items-center justify-center ">
                  <PlayIcon color="black" />
                </Button>
                <p>Play trailer</p>
                <p>time</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div>
              {
                movie?.genres.map((el,index)=>{
                  <div></div>
                })
              }
            </div> */}
        <p>{movie?.overview}</p>
        <div className="flex border-b-2 py-2">
          <p className="w-[120px]">
            <b>Director</b>
          </p>
          <p>dood</p>
        </div>
        <div className="flex border-b-2 py-2">
          <p className="w-[120px]">
            <b>Writers</b>
          </p>
          <p>dood</p>
        </div>
        <div className="flex border-b-2 py-2">
          <p className="w-[120px]">
            <b>Stars</b>
          </p>
          <p>dood</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[26px] font-semibold">More like this</p>
          <Link href={`/`}>
            <div className="flex items-center gap-2">
              <p>See more</p>
              <SeeMoreIcon color={theme == "light" ? "black" : "white"} />
            </div>
          </Link>
        </div>
        <div></div>
      </div>
      <Footer />
    </div>
  );
}
