"use client";

import { Logo } from "@/icons/Logo";
import { Button, Input } from "@/components/ui/index";
import { Sun, Moon, Search, X } from "lucide-react";
import { Genres } from "@/components";
import { useEffect, useState } from "react";
import { SearchTab, HiddenSearch } from "@/components/index";
import { useTheme } from "next-themes";
import { useRouter, useSearchParams } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const searchParams = useSearchParams();

  const getMovieInfo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`
    );
    const result = await response.json();
    setMovies(result.results);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const params = new URLSearchParams(searchParams);
    if (searchParams.get("value") != null) {
      params.set("value", e.target.value);
      router.push(`/search?${params.toString()}`);
    }
  };
  const onClick = () => {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const searchOnClick = (value: boolean) => {
    setIsActive(value);
    setSearchValue("");
  };
  useEffect(() => {
    getMovieInfo();
  }, []);
  useEffect(() => {
    getMovieInfo();
  }, [searchValue]);
  return (
    <div className="flex flex-col relative h-[80px]">
      <div className="dark:bg-black bg-white w-screen flex items-center justify-between  p-5 fixed top-0 z-10">
        <Logo color="#4338CA" />
        <div className="flex gap-1 relative lg:justify-between lg:w-2/3">
          <div className="flex gap-3">
            <Genres isActive={false} />
            <div className="flex items-center justify-around border px-2 rounded-md sm:hidden lg:flex ">
              <button className=" hidden lg:block" disabled>
                <Search size={20} onClick={() => searchOnClick(true)} />
              </button>
              <Search
                size={20}
                onClick={() => searchOnClick(true)}
                className="lg:hidden"
              />
              <Input
                className={`border-none hidden sm:block`}
                placeholder="Search ..."
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col relative lg:w-fit w-full lg:static">
              {searchValue.length != 0 &&
                searchParams.get("value") === null && (
                  <SearchTab array={movies} searchValue={searchValue} />
                )}
            </div>
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
          </Button>
        </div>
      </div>
      <HiddenSearch
        onChange={onChange}
        isActive={isActive}
        searchOnClick={searchOnClick}
      />
    </div>
  );
};
