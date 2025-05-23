'use client'
import { usePathname } from "next/navigation";

export const MoviePages = ({size}:{size:number}) => {
  const pathName=usePathname()
  
  return (
    <div className="w-full">
      {
        !pathName.includes("genre")&&<div className="w-full flex justify-between py-5">
        <div className="w-[300px] h-[15px] bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="w-[200px] h-[15px] bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>
      }
      
      <div className="flex flex-wrap gap-5 w-full">
        {Array.from({ length: size }).map((el, index) => {
          return (
            <div
              key={index}
              className="w-[157px] lg:w-[223px] h-[440px] bg-gray-300 dark:bg-gray-700 rounded-md"
            ></div>
          );
        })}
      </div>
    </div>
  );
};
