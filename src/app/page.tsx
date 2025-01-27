"use client"
import { Header ,BigScreen } from "@/components";
import { useEffect , useState } from "react";

export default function Home() {
  const movieAPIkey="68ddd5c2d68a3e3e8867e8c8a165e3bf"
  const getMovieInfo = async () =>  {
    const movie = await fetch(`https://api.themoviedb.org/3/movie/550?api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf`)
    const result = movie.json
    console.log(movie);
    console.log(result);
    
  }
  useEffect(()=>{
    getMovieInfo()
  },[])
  return (
    <div className="flex flex-col items-center gap-5"> 
      <Header/>
      <BigScreen/>
    </div>
  );
}
