"use client";
import { Header, BigScreen, SectionTwo, Footer } from "@/components";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Home() {
  const [themes, setThemes] = useState<string>("light");
  const { setTheme,theme} = useTheme();
  const [upcomingMovie,setUpcomingMovie]= useState([])
  const [popularMovie,setPopular]= useState([])
  const [topMovie,setTop]= useState([])
  const [nowPlaying,setNowPlaying]= useState([])



  
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
      const responseNow = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf"
      );
      const resultNow = await responseNow.json();
      
      setNowPlaying(resultNow.results)
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
      <BigScreen movieInfos={nowPlaying}/>
      <SectionTwo name={"Upcoming"} array={popularMovie} themes={themes} topic="upcoming"/>
      <SectionTwo name={"Popular"} array={topMovie} themes={themes} topic="popular"/>
      <SectionTwo name={"Top Rated"} array={upcomingMovie} themes={themes} topic="toprated"/>
      <Footer />
    </div>
  );
}
//dynamic route next.js
//usePharans hook
//movie folder -> .env [git ruu push hiihgui]
//   nernii umnu ni nichih NEXT_PUBLIC_API_URL