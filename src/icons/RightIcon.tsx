import * as React from "react"
type Props = {
    color:string
}
export const RightIcon = (props:Props) => {
    const {color}=props
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width={6}
    height={10}
    fill="none"
    {...props}
  >
    <path
      stroke="#09090B"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m1 9 4-4-4-4"
    />
  </svg>
}