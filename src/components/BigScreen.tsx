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
import { getMoviesInfo, getImage } from "@/utils/requests";

type movie = {
  title: string;
  overview: string;
  vote_average: number;
  backdrop_path: string;
};
export const BigScreen = () => {
  const [nowPlaying, setNowPlaying] = useState<Array<movie>>([]);

  const fetchMovies = async () => {
    try {
      const response = await getMoviesInfo(1, "/movie/now_playing");
      setNowPlaying(response.data.results);
    } catch (e) {
      console.error("Failed to fetch movies:", e);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <Carousel className="w-screen h-[600px] border-none relative">
      <CarouselContent className="p-0">
        {nowPlaying.slice(0, 10).map((e, index) => (
          <CarouselItem
            key={index}
            className="relative flex items-center justify-center"
          >
            <img
              className="w-full h-[600px]"
              src={getImage(e.backdrop_path)}
              alt={e.title}
            />
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
              <Button className="flex bg-black w-fit text-white">
                <PlayIcon color="white" />
                <p>Watch trailer</p>
              </Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-[50px]" />
      <CarouselNext className="absolute right-[50px]" />
    </Carousel>
  );
};
