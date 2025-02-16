import { Genres } from "@/components/index";
import { Search, X } from "lucide-react";
import { Input } from "./ui";
type Props = {
  isActive: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchOnClick: (e: boolean) => void;
};
export const HiddenSearch = (props: Props) => {
  const { isActive, onChange, searchOnClick } = props;

  return (
    <div
      className="flex sm:hidden justify-between absolute dark:bg-black bg-white w-screen p-5 z-10 -top-[300px] transition duration-500 ease-in-out"
      style={{
        transform: isActive ? "translateY(300px)" : "translateY(0px)",
      }}
    >
      <div className="flex gap-2">
        <Genres isActive={isActive} />
        <div className="flex items-center justify-around border px-2 rounded-md sm:hidden lg:flex ">
          <Search size={20} />
          <Input
            className="border-none "
            placeholder="Search ..."
            onChange={onChange}
          />
        </div>
      </div>
      <X onClick={() => searchOnClick(false)} />
    </div>
  );
};
