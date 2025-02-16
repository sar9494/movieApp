"use client";
import { BigScreen, SectionTwo } from "@/components";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-5 relative">
      <BigScreen />
      <SectionTwo name={"Upcoming"} title={"upcoming"} />
      <SectionTwo name={"Popular"} title={"popular"} />
      <SectionTwo name={"Top Rated"} title={"top_rated"} />
    </div>
  );
}
//dynamic route next.js
//usePharans hook
//movie folder -> .env [git ruu push hiihgui]
//   nernii umnu ni nichih NEXT_PUBLIC_API_URL
