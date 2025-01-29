import { Genres ,MovieBox } from "./index"
import { useState,useEffect } from "react"
type props={
    theme:string,
}
export const FilterGenre = (props:props) =>{
    const {theme}=props

    const getMovieInfo = async () => {
        try {
          const response1 = await fetch(
            "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf"
          );
          const result1 = await response1.json();
          console.log(result1);
          
        //   setUpcomingMovie(result1.results)
    
          const response2 = await fetch(
            "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf"
          );
          const result2 = await response2.json();
          
        //   setPopular(result2.results)
    
          const responseTop = await fetch(
            "https://api.themoviedb.org/3/movie/top_rated??language=en-US&page=1&api_key=68ddd5c2d68a3e3e8867e8c8a165e3bf"
          );
          const resultTop = await responseTop.json();
          
        //   setTop(resultTop.results)
        } catch (e) {
          console.log(e);
        }
      };
      
useEffect(()=>{
    getMovieInfo()
},[])
    return(
        <div className="flex">
            <div>
            <p className="text-3xl"><b>Search Filter</b></p>
            <Genres theme={theme} className="border-none flex w-[480px]"/>
            </div>
            <div>

            </div>
        </div>
    )
}