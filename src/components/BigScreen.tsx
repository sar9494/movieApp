import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Button,
} from "@/components/ui/index";
import { StarIcon, PlayIcon } from "../icons/index";
type props = {
  movieInfos: Array<movie>;
};
type movie = {
  title: string;
  overview: string;
  vote_average: number;
};
export const BigScreen = (props: props) => {
  const { movieInfos } = props;
  return (
    <Carousel className="w-screen h-[600px] border-none relative">
      <CarouselContent className="p-0">
        {movieInfos.slice(0, 10).map((e, index) => (
          <CarouselItem
            key={index}
            className="relative flex items-center justify-center"
          >
            <img
              className="w-full h-[600px]"
              src={`https://image.tmdb.org/t/p/original${e.backdrop_path}`}
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
              <Button className="flex bg-black w-fit">
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
