import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getDetailInfo } from "@/utils/requests";
import { PlayIcon } from "lucide-react";
import { useState } from "react";
import ReactPlayer from "react-player";

export const PlayButton = ({
  id,
  pageName,
}: {
  id: string | string[] | undefined;
  pageName: string;
}) => {
  const [trailer, setTrailer] = useState<string>();
  const getTrailer = async (movieId: string | string[] | undefined) => {
    const response3 = await getDetailInfo(movieId, "/videos");
    response3.data.results.map((el: { name: string; key: string }) => {
      if (el.name.includes("railer")) {
        setTrailer(el.key);
      }
    });
    console.log(id);
  };

  return (
    <Dialog>
      <DialogTrigger className="w-fit" onClick={() => getTrailer(id)}>
        {pageName === "bigScreen" ? (
          <div className="flex xl:bg-black xl:dark:bg-black w-fit xl:text-white bg-gray-200 dark:bg-gray-700 items-center gap-[8px] px-[16px] py-[8px] rounded">
            <PlayIcon size={12} />
            <p>Watch trailer</p>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-white">
            <div className="rounded-full w-fit h-fit p-3 flex items-center justify-center bg-white ">
              <PlayIcon color="black" />
            </div>
            <p>Play trailer</p>
            <p>runtime</p>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="lg:w-[700px] w-[430px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer}`}
          width={"w-full "}
        />
      </DialogContent>
    </Dialog>
  );
};
