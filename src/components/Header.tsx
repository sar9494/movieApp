
import { DownIcon ,Logo ,Sun,Moon} from "../icons/index"
import { Button , Input } from "./ui/index"

export const Header = () =>{
    return(
        <div className="w-screen flex items-center justify-around gap-10 p-5">
            <Logo/>
            <div className="flex gap-5">
            <Button><DownIcon/> Genre</Button>
            <Input className="w-[300px]" placeholder="Search ..."/>
            </div>
            <Button className="bg-white border hover:bg-gray-100"><Moon color="black"/></Button>

        </div>
    )
}