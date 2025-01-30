"use client";

import { DownIcon, Logo, Sun, Moon, Search } from "../icons/index";
import { Button, Input } from "./ui/index";
import { Genres } from "./index";
import { useEffect, useState } from "react";
import { SearchTab } from "../components/index";

type props = {
  setThemes: Function;
  themes:string
};
type Movie = {
  title:string,
  poster_path:string,
  vote_average:number,
release_date:string
}
export const Header = (props: props) => {
  const [isClick,setIsClick]=useState(false)
  const [searchValue,setSearchValue] = useState("")
  const [movies,setMovies] = useState <Array<Movie>>([])

  const {themes ,setThemes } = props;
  const getMovieInfo= async()=>{
    const response = await fetch( `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`)
    const result = await response.json();
    console.log(result.results);
    setMovies(result.results)
  }
  const onChange =(e: React.ChangeEvent<HTMLInputElement>) =>{
    setSearchValue(e.target.value)
  }
  const onClick = () =>{
    if(themes=="light"){
        setThemes("dark")
    }else {
    setThemes("light")}
  }
  useEffect(()=>{
    getMovieInfo()
  },[searchValue])
  const genresClick = () =>{
    isClick==false?setIsClick(true):setIsClick(false)
  }
  return (
    <div className="dark:bg-black bg-white w-screen flex items-center justify-around gap-10 p-5 sticky top-0 z-10">
      <Logo color="#4338CA" />
      <div className="flex gap-5 relative">
        <Button className="dark:text-white text-black border hover:bg-gray-100 bg-white dark:bg-black"
        onClick={genresClick}>
          <DownIcon color={themes=="light"?"black" :"white"} /> Genre
        </Button>
        <div className="flex items-center justify-around border px-2 rounded-lg ">
          <Search />
          <Input className="w-[300px] border-none " placeholder="Search ..." onChange={onChange}/>
        </div>
        <Genres theme={themes} className={isClick?"flex absolute p-5 w-[600px]":"hidden"}/>
        {searchValue.length!=0&&(<SearchTab array={movies} themes={themes}/>)}
      </div>
      <Button variant="outline" size="icon" onClick={onClick}>
        <Moon
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          color="black"
        />
        <Sun
          className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          color="white"
        />
        <span className="sr-only">Toggle theme</span>
      </Button>
      
    </div>
  );
};
