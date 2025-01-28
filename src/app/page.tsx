"use client";
import { Header, BigScreen, SectionTwo, Footer } from "@/components";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Home() {
  const [themes, setThemes] = useState<string>("light");
  const { setTheme } = useTheme();
  const [upcomingMovie,setUpcomingMovie]= useState<data[]>([])
  const [popularMovie,setPopular]= useState([])
  const [topMovie,setTop]= useState([])



  
  const getMovieInfo = async () => {
    try {
      const response1 = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf"
      );
      const result1 = await response1.json();
      
      setUpcomingMovie(result1.results)

      const response2 = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf"
      );
      const result2 = await response2.json();
      
      setPopular(result2.results)

      const responseTop = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated??language=en-US&page=1&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf"
      );
      const resultTop = await responseTop.json();
      
      setTop(resultTop.results)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMovieInfo();
  }, []);

  useEffect(() => {
    setTheme(themes);
  }, [themes]);

  return (
    <div className="flex flex-col items-center gap-5 relative">
      <Header setThemes={setThemes} themes={themes} />
      <BigScreen movieInfos={upcomingMovie}/>
      <SectionTwo name={"Upcoming"} array={popularMovie} themes={themes}/>
      <SectionTwo name={"Popular"} array={topMovie} themes={themes}/>
      <SectionTwo name={"Top Rated"} array={upcomingMovie} themes={themes}/>
      <Footer />
    </div>
  );
}
