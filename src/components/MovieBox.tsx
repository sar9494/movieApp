
import { StarIcon } from "../icons/index";
type props= {
    url:string,
    rating:number,
    title:string,
    className:string
}
export const MovieBox = (props:props) => {
    const {url,rating,title,className} = props
  return (
    <div className={`h-fit rounded-lg overflow-hidden ${className}`}>
      <img className="w-full" src={`https://image.tmdb.org/t/p/original${url}`} alt="" />
      <div className="w-full h-[95px] bg-gray-200 p-2 dark:bg-gray-600">
        <div className="flex gap-2 items-center">
          <StarIcon />
          <p>{rating}</p>
        </div>
        <h1 className="text-xl">{title}</h1>
      </div>
    </div>
  );
};
