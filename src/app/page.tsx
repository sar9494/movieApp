"use client";
import { Header, BigScreen, SectionTwo, Footer } from "@/components";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-5 relative">
      <Header />
      <BigScreen/>
      <SectionTwo name={"Upcoming"} title={"popular"}  />
      <SectionTwo name={"Popular"} title={"top_rated"} />
      <SectionTwo name={"Top Rated"} title={"upcoming"}  />
      <Footer />
    </div>
  );
}
//dynamic route next.js
//usePharans hook
//movie folder -> .env [git ruu push hiihgui]
//   nernii umnu ni nichih NEXT_PUBLIC_API_URL