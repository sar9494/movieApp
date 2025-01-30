import { MovieBox } from "./index";
import { SeeMoreIcon } from "@/icons/index";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type props = {
  name: string;
  array: Array<movie>;
  themes: string;
  topic: string;
};
type movie = {
  title: string;
  poster_path: string;
  vote_average: number;
};
export const SectionTwo = (props: props) => {
  const { name, array, themes, topic } = props;
  const router = useRouter();

  return (
    <div className="flex flex-col w-[1250px] gap-4 overflow-y-auto mt-[50px]">
      <div className="flex items-center justify-between ">
        <h1 className="text-4xl">
          <b>{name}</b>
        </h1>
        <Link href={`/${topic}`}>
          <div
            className="flex items-center gap-2"
            // onClick={() => {
            //   router.push("/popular");
            // }}
          >
            <p>See more</p>
            <SeeMoreIcon color={themes == "light" ? "black" : "white"} />
          </div>
        </Link>
      </div>
      <div className="flex shrink-0 flex-wrap w-full gap-6 overflow-y-auto">
        {array.slice(0, 10).map((movie, index) => (
          <MovieBox
            key={index}
            title={movie.title}
            url={movie.poster_path}
            rating={movie.vote_average}
            className="w-[230px]"
            imgHeigth="h-[345px]"
          />
        ))}
      </div>
    </div>
  );
};
