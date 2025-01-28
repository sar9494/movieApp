"use client";

import { DownIcon, Logo, Sun, Moon, Search } from "../icons/index";
import { Button, Input } from "./ui/index";

type props = {
  setThemes: Function;
  themes:string
};
export const Header = (props: props) => {
  const {themes ,setThemes } = props;
  const onClick = () =>{
    if(themes=="light"){
        setThemes("dark")
    }else {
    setThemes("light")}
  }
  return (
    <div className="dark:bg-black bg-white w-screen flex items-center justify-around gap-10 p-5 sticky top-0 z-10">
      <Logo color="#4338CA" />
      <div className="flex gap-5">
        <Button className="dark:text-white text-black border hover:bg-gray-100 bg-white dark:bg-black">
          <DownIcon color={themes=="light"?"black" :"white"} /> Genre
        </Button>
        <div className="flex items-center justify-around border px-2 rounded-lg ">
          <Search />
          <Input className="w-[300px] border-none " placeholder="Search ..." />
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
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};
