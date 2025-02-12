"use client";

import {  Logo } from "@/icons/Logo";
import { Button, Input } from "./ui/index";
import { Sun ,Moon,Search,X} from "lucide-react";
import { Genres } from "./index";
import { useEffect, useState } from "react";
import { SearchTab } from "@/components/index";
import { useTheme } from "next-themes";

type Props = {
  onChange?: (_value: string) => void;
  place?:boolean
};
export const Header = (props: Props) => {
  const { onChange: handleValueChange ,place} = props;
  const { setTheme, theme } = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [isActive ,setIsActive] = useState(false)

  const getMovieInfo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`
    );
    const result = await response.json();
    setMovies(result.results);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    handleValueChange && handleValueChange(e.target.value);
  };
  const onClick = () => {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const searchOnClick = (value:boolean) =>{
setIsActive(value)
  }
  useEffect(() => {
    getMovieInfo();
  }, []);
  useEffect(() => {
    getMovieInfo();
  }, [searchValue]);
  return (
    <div className="dark:bg-black bg-white w-screen flex items-center justify-between gap-10 p-5 sticky top-0 z-10">
      
      {!isActive&&<Logo color="#4338CA" />}
      <div className="flex gap-5 relative">
      <Genres isActive={isActive}/>
        <div className="flex items-center justify-around border px-2 rounded-lg ">
          <Search size={20} onClick={()=>searchOnClick(true)}/>
          <Input
            className={`w-[300px] border-none hidden sm:block ${isActive?"block ":"hidden"}`}
            placeholder="Search ..."
            onChange={onChange}
          />
        </div>
        {searchValue.length != 0 &&!place&& (
          <SearchTab array={movies} searchValue={searchValue} />
        )}
      </div>
      <Button variant="outline" size="icon" onClick={onClick} className={`${!isActive?"flex":"hidden"}`}>
        <Moon
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          color="black"
        />
        <Sun
          className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          color="white"
        />
      </Button>
      <X className={`${isActive?"flex":"hidden"}`} onClick={()=>searchOnClick(false)}/>
    </div>
  );
};