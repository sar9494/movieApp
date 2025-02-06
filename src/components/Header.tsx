"use client";

import { DownIcon, Logo, Sun, Moon, Search } from "../icons/index";
import { Button, Input } from "./ui/index";
import { Genres } from "./index";
import { useEffect, useState } from "react";
import { SearchTab } from "../components/index";
import { useTheme } from "next-themes";
import Link from "next/link";

type Props = {
  // searchValue: string;
  // setSearchValue: Function;
  onChange?: (_value: string) => void;
};
export const Header = (props: Props) => {
  const { onChange: handleValueChange } = props;
  const { setTheme, theme } = useTheme();
  const [isClick, setIsClick] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);

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

  useEffect(() => {
    getMovieInfo();
  }, [searchValue]);

  const genresClick = () => {
    isClick == false ? setIsClick(true) : setIsClick(false);
  };
  return (
    <div className="dark:bg-black bg-white w-screen flex items-center justify-around gap-10 p-5 sticky top-0 z-10">
      <Link href={"/"}>
        <Logo color="#4338CA" />
      </Link>
      <div className="flex gap-5 relative">
        <Button
          className="dark:text-white text-black border hover:bg-gray-100 bg-white dark:bg-black"
          onClick={genresClick}
        >
          <DownIcon color={theme == "light" ? "black" : "white"} /> Genre
        </Button>
        <div className="flex items-center justify-around border px-2 rounded-lg ">
          <Search />
          <Input
            className="w-[300px] border-none "
            placeholder="Search ..."
            onChange={onChange}
          />
        </div>
        <Genres
          className={isClick ? "flex absolute p-5 w-[600px]" : "hidden"}
          pageName="genre"
        />
        {searchValue.length != 0 && (
          <SearchTab array={movies} searchValue={searchValue} />
        )}
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
