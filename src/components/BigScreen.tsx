import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Button,
} from "@/components/ui/index";
import { StarIcon, PlayIcon } from "../icons/index";
import { useEffect, useState } from "react";
import { getMoviesInfo, getDetailInfo } from "@/utils/requests";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactPlayer from "react-player";

type movie = {
  title: string;
  overview: string;
  vote_average: number;
  backdrop_path: string;
  id: string | string[] | undefined;
};
export const BigScreen = () => {
  const [nowPlaying, setNowPlaying] = useState<Array<movie>>([]);
  const [trailer, setTrailer] = useState<string>();

  const fetchMovies = async () => {
    try {
      const response = await getMoviesInfo(1, "/movie/now_playing");
      setNowPlaying(response.data.results);
    } catch (e) {
      console.error("Failed to fetch movies:", e);
    }
  };

  const getTrailer = async (movieId: string| string[] | undefined) => {
    const response3 = await getDetailInfo(movieId, "/videos");
    response3.data.results.map((el: { name: string; key: string }) => {
      if (el.name.includes("railer")) {
        setTrailer(el.key);
      }
    });
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <Carousel className="w-screen h-[600px] border-none relative">
      <CarouselContent className="p-0">
        {nowPlaying.slice(0, 10).map((e, index) => (
          <CarouselItem key={index}>
            <div className="relative flex items-center justify-center">
              <Link href={`/details/${e.id}`} className="w-full">
                <img
                  className="w-full h-[600px] object-cover"
                  src={`https://image.tmdb.org/t/p/original${e.backdrop_path!}`}
                  alt={e.title}
                />
              </Link>
              <div className="absolute text-white left-[200px] flex flex-col gap-1">
                <p>Now Playing:</p>
                <h1 className="text-2xl truncate w-[200px]">
                  <b>{e.title}</b>
                </h1>
                <div className="flex items-center gap-3">
                  <StarIcon />
                  <div className="flex">
                    <p>{e.vote_average}</p>
                    <p className="opacity-70">/10</p>
                  </div>
                </div>
                <p className=" w-[350px] h-[200px]">{e.overview}</p>
                <Dialog>
                  <DialogTrigger>
                    <div className="flex bg-black w-fit text-white items-center gap-[8px] px-[16px] py-[8px] rounded" onClick={()=>getTrailer(e.id)}>
                      <PlayIcon color="white" />
                      <p>Watch trailer</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-fit">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                      <DialogDescription>
                      </DialogDescription>
                    </DialogHeader>
                    <ReactPlayer  url={`https://www.youtube.com/watch?v=${trailer}`}/>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-[50px]" />
      <CarouselNext className="absolute right-[50px]" />
    </Carousel>
  );
};
