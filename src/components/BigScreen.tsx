import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/index";
import Autoplay from "embla-carousel-autoplay";
import { Play, StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { PlayButton } from "./index";
import Link from "next/link";
import { MovieType } from "@/types";
import axios from "axios";

export const BigScreen = () => {
  const [nowPlaying, setNowPlaying] = useState<Array<MovieType>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      // setIsLoading(true);
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf"
      );

      setNowPlaying(response.data.results);
    } catch (e) {
      console.error("Failed to fetch movies:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div>
      {isLoading ? (
        <Carousel
          className="w-screen border-none "
          plugins={[Autoplay({ delay: 5000 })]}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="p-0">
            <CarouselItem>
              <div className="w-screen h-[600px] xl:h-[600px] text-black dark:text-white bg-gray-200 dark:bg-gray-700 border-none relative flex items-center">
                <div className="absolute   left-[200px] flex flex-col gap-2 p-5">
                  <div className="flex justify-between">
                    <div>
                      <p>Now Playing:</p>
                      <div className="w-[200px] h-[25px] bg-gray-300 dark:bg-gray-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StarIcon color="yellow" fill="yellow" size={24} />
                      <div className="flex items-center">
                        <div className="w-[30px] h-[15px] rounded-full bg-gray-300 dark:bg-gray-500"></div>
                        <p className="opacity-70">/10</p>
                      </div>
                    </div>
                  </div>
                  <p className=" w-[380px] h-[100px] bg-gray-300 dark:bg-gray-500 rounded-xl whitespace-pre-wrap overflow-hidden text-ellipsis"></p>
                  <Button className="w-fit bg-black">
                    <Play color="white" />
                    <p className="text-white">Watch trailer</p>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute left-[50px] hidden xl:flex" />
          <CarouselNext className="absolute right-[50px] hidden xl:flex" />
        </Carousel>
      ) : (
        <Carousel
          className="w-screen border-none "
          plugins={[Autoplay({ delay: 5000 })]}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="p-0">
            {nowPlaying.slice(0, 10).map((e, index) => (
              <CarouselItem key={index}>
                <div className="xl:relative flex flex-col  justify-center ">
                  <Link href={`/details/${e.id}`} className="w-full">
                    <img
                      className="w-full h-[245px] xl:h-[600px] object-cover"
                      src={`https://image.tmdb.org/t/p/original${e.backdrop_path!}`}
                      alt={e.title}
                    />
                  </Link>
                  <div className="xl:absolute xl:text-white  left-[200px] flex flex-col gap-1 p-5">
                    <div className="flex justify-between">
                      <div>
                        <p>Now Playing:</p>
                        <h1 className="text-2xl truncate w-[200px]">
                          <b>{e.title}</b>
                        </h1>
                      </div>
                      <div className="flex items-center gap-3">
                        <StarIcon color="yellow" fill="yellow" size={24} />
                        <div className="flex">
                          <p>{e.vote_average}</p>
                          <p className="opacity-70">/10</p>
                        </div>
                      </div>
                    </div>
                    <p className=" w-[380px] h-[100px] whitespace-pre-wrap overflow-hidden text-ellipsis">
                      {e.overview}
                    </p>
                    <PlayButton id={e.id} pageName="bigScreen" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[50px] hidden xl:flex" />
          <CarouselNext className="absolute right-[50px] hidden xl:flex" />
        </Carousel>
      )}
    </div>
  );
};
