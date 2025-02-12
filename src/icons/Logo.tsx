import { Film } from "lucide-react";
import Link from "next/link";

export const Logo = ({ color = "white" }: { color?: string }) => {
  return (
    <Link
      href={"/"}
      style={{ color: color }}
      className="flex gap-2 items-center"
    >
      <Film size={20} />
      <h2 className="italic font-bold">Movie Z</h2>
    </Link>
  );
};
