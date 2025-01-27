import * as React from "react"
type props = {
  color:string
}
export const DownIcon = (props:props) => {
  const {color} =props
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={5}
    fill="none"
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m1 .5 4 4 4-4"
    />
  </svg>
}