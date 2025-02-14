import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GenreList } from "./index";
import { ChevronDown } from "lucide-react";

export const Genres = ({ isActive }: { isActive: boolean }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className= {`border items-center justify-center px-2 rounded  lg:flex ${isActive?"block":"hidden"}`} >
          <ChevronDown />
          <p className={`${isActive && "hidden"}`}>Genres</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[335px] lg:w-[580px] p-5">
          <DropdownMenuLabel className="font-normal">
            <p className={`text-3xl`}>
              <b>Genres</b>
            </p>
            <p>See lists of movies by genre</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <GenreList pageName="genre" />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
