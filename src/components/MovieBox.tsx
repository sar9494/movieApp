import Link from "next/link";
import { StarIcon } from "../icons/index";
import { MovieType } from "@/app/details/[movieId]/page";

type props= {
    url:string,
    rating:number,
    title:string,
    className:string,
    imgHeigth:string,
    id:string | string[] | undefined
}
export const MovieBox = (props:props) => {
    const {url,rating,title,className ,imgHeigth,id} = props

  return (
    <Link href={`/details/${id}`}>
    <div className={`h-fit rounded-lg overflow-hidden ${className}`}>
      <img className={`w-full ${imgHeigth}`} src={`https://image.tmdb.org/t/p/original${url}`} alt="" />
      <div className="w-full h-[95px] bg-gray-200 p-2 dark:bg-gray-600">
        <div className="flex gap-2 items-center">
          <StarIcon />
          <p>{rating}</p>
        </div>
        <h1 className="text-xl">{title}</h1>
      </div>
    </div>
    </Link>
  );
};
