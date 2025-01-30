'use client'
import { Button } from "./ui";
import { RightIcon ,RemoveIcon } from "@/icons/index";
import { useEffect, useState } from "react";
import Link from "next/link";

const GENRES: string[] = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "Game-Show",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Reality-TV",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Talk-Show",
  "Thriller",
  "War",
  "Western",
];
type props = {
  theme: string;
  className: string;
};
type genre = {
  name: string;
  id: number;
};
type IsClick ={
  id:number,
  clicked:boolean
}
export const Genres = (props: props) => {
  const { theme, className } = props;
  const [genre, setGenre] = useState<Array<genre>>();
  const [chosenGenre,setChosenGenre] =useState <Array<number>>()
  const [isClick,setIsClick] = useState<Array<IsClick>>([])

  const getMovieInfo = async () => {
    try {
      const response1 = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf"
      );
      const result1 = await response1.json();
      setGenre(result1.genres);
      //   setUpcomingMovie(result1.results)
    } catch (e) {
      console.log(e);
    }
  };
  const onClick = (id:number) => {
    //isClick?setIsClick([...isClick,id:[...id,clicked:false,id:0]]):([...isClick,{clicked:true,id:id}])
    console.log(isClick);
    
  };

  useEffect(() => {
    getMovieInfo();
  }, [genre]);

  return (
    <div
      className={` gap-3 flex-wrap top-[80px] bg-white dark:bg-black  rounded-xl border flex-col ${className}`}
    >
      <div>
        <p className="text-3xl">
          <b>Genres</b>
        </p>
        <p>See lists of movies by genre</p>
        <hr />
      </div>
      <div className=" w-full flex gap-3 flex-wrap ">
        {genre?.map((el:genre, index) => (
          <Link href={"/genre"} key={index} onClick={()=>onClick(el.id)}>
          <Button 
            className="bg-white dark:bg-black w-fit hover:opacity-80 border p-1 flex items-center justify-center h-[20px]"
            
          >
            <p className="text-black dark:text-white">{el.name}</p>
            {
              isClick?(<RemoveIcon color="black"/>):(<RightIcon color={theme == "light" ? "black" : "white"} />)
            }
            
          </Button>
          </Link>
          
        ))}
      </div>
    </div>
  );
};
