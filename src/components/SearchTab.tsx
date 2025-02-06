import { StarIcon,SeeMoreIcon} from "../icons/index";
import Link from "next/link";
import { useTheme } from "next-themes";

type props = {
  array: Array<Movie>;
  searchValue:string
};
type Movie = {
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  id:number
};
export const SearchTab = (props: props) => {
  const { array,searchValue  } = props;
  const {theme} =useTheme()
  
  return (
    <div className="w-[600px] bg-white dark:bg-black absolute top-[80px]  rounded-xl flex flex-col gap-3 border p-3">
      {array.slice(0, 5).map((el, index) => (

<Link href={`/details/${el.id}`} key={index}>
        <div  className=" rounded flex gap-3 p-3 justify-between items-center border-b-2">
          <div className="flex gap-3  ">
            <img
              className="w-[80px] h-[100px] rounded-xl"
              src={`https://image.tmdb.org/t/p/original${el.poster_path}`}
              alt=""
            />
            <div>
              <p>
                <b>{el.title}</b>
              </p>
              <div className="flex">
                <StarIcon />
                <p>{el.vote_average}/10</p>
              </div>
            </div>
          </div>
          <div
            className="flex items-center gap-2"
          >
            <p>See more</p>
            <SeeMoreIcon color={theme == "light" ? "black" : "white"} />
          </div>
        </div>
        </Link>
      ))}
      <Link href={"/search"}>
      <p>See all results for <b>"{searchValue}"</b> </p>
      </Link>
    </div>
  );
};
