export const MoviePages = () => {
  return (
    <div>
      <div className="w-full flex justify-between py-5">
        <div className="w-[300px] h-[15px] bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="w-[200px] h-[15px] bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>
      <div className="flex flex-wrap gap-5">
        {Array.from({ length: 10 }).map((el, index) => {
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
