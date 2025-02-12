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

export const PlayButton = ({ id }: { id: string | string[] | undefined }) => {
  const [trailer, setTrailer] = useState<string>();
  const getTrailer = async (movieId: string | string[] | undefined) => {
    const response3 = await getDetailInfo(movieId, "/videos");
    response3.data.results.map((el: { name: string; key: string }) => {
      if (el.name.includes("railer")) {
        setTrailer(el.key);
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className="flex bg-black w-fit text-white items-center gap-[8px] px-[16px] py-[8px] rounded"
          onClick={() => getTrailer(id)}
        >
          <PlayIcon color="white" size={12}/>
          <p>Watch trailer</p>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ReactPlayer url={`https://www.youtube.com/watch?v=${trailer}`} />
      </DialogContent>
    </Dialog>
  );
};
