import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/index";
import Autoplay from "embla-carousel-autoplay";
import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getMoviesInfo } from "@/utils/requests";
import { PlayButton } from "./index";
import Link from "next/link";
import { MovieType } from "@/types";

export const BigScreen = () => {
  const [nowPlaying, setNowPlaying] = useState<Array<MovieType>>([]);

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
    <Carousel
      className="w-screen h-[600px] border-none relative"
      plugins={[Autoplay({ delay: 5000 })]}
      opts={{
        loop: true,
      }}
    >
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
                  <StarIcon color="yellow" fill="yellow" size={24} />
                  <div className="flex">
                    <p>{e.vote_average}</p>
                    <p className="opacity-70">/10</p>
                  </div>
                </div>
                <p className=" w-[350px] h-[200px]">{e.overview}</p>
                <PlayButton id={e.id} />
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
