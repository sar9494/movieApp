import { MovieBox } from "./index";
import { SeeMoreIcon } from "@/icons/index";
type props = {
  name: string;
  array: Array<Object>;
  themes: string;
};
export const SectionTwo = (props: props) => {
  const { name, array, themes } = props;
  console.log(array);

  return (
    <div className="flex flex-col w-[1250px] gap-4 overflow-y-auto mt-[50px]">
      <div className="flex items-center justify-between ">
        <h1 className="text-4xl">
          <b>{name}</b>
        </h1>
        <div className="flex items-center gap-2">
          <p>See more</p>
          <SeeMoreIcon color={themes == "light" ? "black" : "white"} />
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap w-full gap-6 overflow-y-auto">
        {array.slice(0, 10).map((movie, index) => (
          <MovieBox
            key={index}
            title={movie.title}
            url={movie.poster_path}
            rating={movie.vote_average}
          />
        ))}
      </div>
    </div>
  );
};
