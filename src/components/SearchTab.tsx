import { StarIcon } from "lucide-react";
import Link from "next/link";
import { MovieType } from "@/types";
import { MoveRight } from "lucide-react";

type props = {
  array: Array<MovieType>;
  searchValue: string;
  isLoading: boolean;
};
export const SearchTab = (props: props) => {
  const { array, searchValue, isLoading } = props;
  console.log(array.length);

  return (
    <div className="lg:w-[600px] bg-white dark:bg-black absolute top-[80px] w-[335px] h-[500px] right-0 lg:left-0 overflow-scroll rounded-xl flex flex-col gap-3 border p-3">
      {array.slice(0, 5).map((el, index) =>
        isLoading ? (
          <div
            key={index}
            className="p-3 flex justify-between items-center w-full   border-b-2 "
          >
            <div className="flex gap-2">
              <div className="w-[80px] h-[100px] bg-gray-300 dark:bg-gray-500 rounded-xl"></div>
              <div>
                <div className="w-[200px] h-[25px] bg-gray-300 dark:bg-gray-500 rounded-full"></div>
                <div className="flex items-center gap-1 mt-1">
                  <StarIcon color="yellow" fill="yellow" size={20} />
                  <p className="w-[40px] h-[20px] bg-gray-300 dark:bg-gray-500 rounded-full"></p>
                  <p>/10</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p>See more</p>
              <MoveRight />
            </div>
          </div>
        ) : array.length < 1 ? (
          <div className="w-full h-full flex items-center justify-between">
            <p>{searchValue} : Movie not found</p>
          </div>
        ) : (
          <Link href={`/details/${el.id}`} key={index}>
            <div className=" rounded flex gap-3 p-3 justify-between items-center border-b-2">
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
                  <div className="flex items-center gap-1 mt-1">
                    <StarIcon color="yellow" fill="yellow" size={20} />
                    <p>{el.vote_average}/10</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p>See more</p>
                <MoveRight />
              </div>
            </div>
          </Link>
        )
      )}
      <Link href={`/search?value=${searchValue}`}>
        <p>
          See all results for <b>"{searchValue}"</b>{" "}
        </p>
      </Link>
    </div>
  );
};
