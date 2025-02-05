"use client";
import { Button } from "./ui";
import { RightIcon, RemoveIcon } from "@/icons/index";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { getMoviesInfo } from "@/utils/requests";
import { useParams ,useRouter , useSearchParams} from "next/navigation";
import { log } from "console";
type props = {
  className: string;
};
type genre = {
  name: string;
  id: string;
};
type IsClick = {
  id: number;
  clicked: boolean;
};
export const Genres = (props: props) => {
  const { className } = props;
  const [genre, setGenre] = useState<Array<genre>>();
  // const [chosenGenres, setChosenGenres] = useState<Array<number>>([]);
  const [isClick, setIsClick] = useState<Array<IsClick>>([]);
  const { theme } = useTheme();
  const router=useRouter()
  const searchParams= useSearchParams();
  let chosenGenres=(searchParams.get("genreslds")||"").split(",")

  const getMovieInfo = async () => {
    try {
      const response1 = await getMoviesInfo(1, "/genre/movie/list");
      setGenre(response1.data.genres);
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(chosenGenres.length);
  
  const onClick = (id: string) => {
    const params = new URLSearchParams(searchParams)
    let counter=0
    chosenGenres.map((el,index)=>{
      if(el!=""&&!el.includes(id)){
        counter++
      }
      else{
        const newChosen=chosenGenres.map((el)=>{
          if(!el.includes(id)){
            return el
          }
        })
        // chosenGenres=newChosen
        console.log(newChosen);
        
      }
    })
    if(counter+1!==chosenGenres.length){
      chosenGenres.push(id)
    params.set("genreslds",chosenGenres.join(","))
    router.push(`/genre?${params.toString()}`)
    console.log(chosenGenres);

    }
      
    // console.log(chosenGenres);
    
    // chosenGenres.push(id)
    // params.set("genreslds",chosenGenres.join(","))
    // router.push(`/genre?${params.toString()}`)
    //   console.log(id);
  };
  

  useEffect(() => {
    getMovieInfo();
  }, []);

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
        {genre?.map((el: genre, index) => (
          // <Link
          //   href={`/genre?=${el.id}`}
          //   key={index}
          //   onClick={() => onClick(el.id)}
          // >
            <Button key={index}  onClick={() => onClick(el.id)} className="bg-white dark:bg-black w-fit hover:opacity-80 border p-1 flex items-center justify-center h-[20px]">
              <p className="text-black dark:text-white">{el.name}</p>
              {isClick ? (
                <RemoveIcon color={theme == "light" ? "black" : "white"} />
              ) : (
                <RightIcon color={theme == "light" ? "black" : "white"} />
              )}
            </Button>
          // </Link>
        ))}
      </div>
    </div>
  );
};
