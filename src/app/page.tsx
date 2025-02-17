"use client";
import { BigScreen, SectionTwo } from "@/components";
import { useState } from "react";
export default function Home() {
  const [loader, setLoader] = useState(false);
  return (
    <div>
      { (
        <div className="flex flex-col items-center gap-5 relative">
          <BigScreen  />
          <SectionTwo name={"Upcoming"} title={"upcoming"} />
          <SectionTwo name={"Popular"} title={"popular"} />
          <SectionTwo name={"Top Rated"} title={"top_rated"} />
        </div>
      )}
    </div>
  );
}
//dynamic route next.js
//usePharans hook
//movie folder -> .env [git ruu push hiihgui]
//   nernii umnu ni nichih NEXT_PUBLIC_API_URL
