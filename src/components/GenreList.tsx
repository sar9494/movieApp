"use client";
import { useEffect, useState } from "react";
import { getMoviesInfo } from "@/utils/requests";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "./ui/badge";
import {ChevronRight,X} from "lucide-react";
type props = {
  pageName: string;
};
type genre = {
  name: string;
  id: string;
};
export const GenreList = (props: props) => {
  const {  pageName } = props;
  const [genre, setGenre] = useState<Array<genre>>();
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
    chosenGenres = chosenGenres.filter((el) => el != "");
    let newGenre = chosenGenres.join(",");
    if (newGenre.includes(id)) {
      chosenGenres = newGenre.split(`${id}`).join("").split(",");
      chosenGenres = chosenGenres.filter((el) => el != "");
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
    <>
          <div className="w-full flex flex-wrap gap-5 py-3 ">
          {genre?.map((el: genre, index) => (
            <div key={index}>
              <Badge variant={"outline"}
                onClick={() => onClick(el.id)}
                className={`${
                  chosenGenres.join(",").includes(el.id)
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "bg-white dark:bg-black text-black dark:text-white"
                } w-fit hover:opacity-80 border p-1 flex items-center justify-center h-[20px] `}
              >
                <p>{el.name}</p>
                {chosenGenres.join(",").includes(el.id) ? (
                  <X size={16}/>
                ) : (
                  <ChevronRight  size={16}/>
                )}
              </Badge>
            </div>
          ))}
          </div>
    </>
  );
};
