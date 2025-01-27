'use client'
import { useState } from "react"
import { DownIcon ,Logo ,Sun,Moon, Search} from "../icons/index"
import { Button , Input } from "./ui/index"
export const Header = () =>{
    const [search,setSearch] = useState <string>("")

    return(
        <div className="w-screen flex items-center justify-around gap-10 p-5">
            <Logo/>
            <div className="flex gap-5">
            <Button className="bg-white text-black border hover:bg-gray-100"><DownIcon color="black"/> Genre</Button>
            <div className="flex items-center justify-around border px-2 rounded-lg ">
                <Search/>
            <Input className="w-[300px] border-none " placeholder="Search ..."/>
            </div>
            </div>
            <Button className="bg-white border hover:bg-gray-100"><Moon color="black"/></Button>
        </div>
    )
}