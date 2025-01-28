import * as React from "react"
type props={
    color:string
}
export const PlayIcon = (props:props) => {
    const {color} = props
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m1.333 1 9.333 6-9.333 6V1Z"
    />
  </svg>
}
