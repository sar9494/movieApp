"use client";
import { Button } from "./ui";
import { RightIcon, RemoveIcon } from "@/icons/index";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { getMoviesInfo } from "@/utils/requests";
import { useRouter, useSearchParams } from "next/navigation";
type props = {
  className: string;
  pageName:string;
};
type genre = {
  name: string;
  id: string;
};
export const Genres = (props: props) => {
  const { className ,pageName} = props;
  const [genre, setGenre] = useState<Array<genre>>();
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  let chosenGenres = (searchParams.get("genreslds") || "").split(",");

  const getMovieInfo = async () => {
    try {
      const response1 = await getMoviesInfo(1, "/genre/movie/list");
      setGenre(response1.data.genres);
    } catch (e) {
      console.log(e);
    }
  };


  const onClick = (id: string) => {
    const params = new URLSearchParams(searchParams);
    chosenGenres=chosenGenres.filter((el)=>el!="")
    let newGenre = chosenGenres.join(",");
    if (newGenre.includes(id)) {
      chosenGenres = newGenre.split(`${id}`).join("").split(",");
    chosenGenres=chosenGenres.filter((el)=>el!="")

    } else {
      chosenGenres.push(id);
    }
    params.set("genreslds", chosenGenres.join(","));
    router.push(`/${pageName}?${params.toString()}`);
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
          <Button
            key={index}
            onClick={() => onClick(el.id)}
            className={`${chosenGenres.join(",").includes(el.id)?("bg-black dark:bg-white text-white dark:text-black"):("bg-white dark:bg-black text-black dark:text-white")} w-fit hover:opacity-80 border p-1 flex items-center justify-center h-[20px]`}
          >
            <p>{el.name}</p>
            {chosenGenres.join(",").includes(el.id) ? (
              <RemoveIcon color={theme=="light" ? "white" : "black"} />
            ) : (
              <RightIcon color={theme=="light"? "black" : "white"} />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};
