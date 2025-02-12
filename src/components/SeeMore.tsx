import Link from "next/link"
import { MoveRight } from "lucide-react"

export const SeeMore =({url}:{url:string})=>{
    return <Link href={`${url}`}>
              <div className="flex items-center gap-2">
                <p>See more</p>
                <MoveRight/>
              </div>
            </Link>
}