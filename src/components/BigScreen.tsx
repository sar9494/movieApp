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

export const BigScreen = ({ setLoader }: { setLoader: Function }) => {
  const [nowPlaying, setNowPlaying] = useState<Array<MovieType>>([]);

  const fetchMovies = async () => {
    try {
      setLoader(true);
      const response = await getMoviesInfo(1, "/movie/now_playing");
      setNowPlaying(response.data.results);
    } catch (e) {
      console.error("Failed to fetch movies:", e);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
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
  );
};
