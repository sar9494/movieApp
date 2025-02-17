import { MoviePages } from "./MoviePages";
export const HomePageSkeleton = () => {
  return (
    <div className="flex items-center flex-col">
      <div className="w-full h-[600px] bg-gray-300 dark:bg-gray-700"></div>
      <div className="max-w-[1200px] w-full py-5">
        {Array.from({ length: 3 }).map((el, index) => {
          return <MoviePages key={index} />;
        })}
      </div>
    </div>
  );
};
