import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/index";
import { Card, CardContent } from "@/components/ui/card";
import MoviePoster from "@/images/movie03.png";

export const BigScreen = () => {
  console.log(MoviePoster.src);

  return (
    <Carousel className="w-screen h-[600px] border-none relative">
      <CarouselContent className="p-0">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <img className="w-full h-[600px]" src={MoviePoster.src} alt="" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-[50px]"/>
            <CarouselNext className="absolute right-[50px]"/>
    </Carousel>
  );
};
