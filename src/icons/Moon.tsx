import * as React from "react"
type Props = {
    color:string
}
export const Moon = (props:Props) => {
    const {color}=props
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 1a4.243 4.243 0 1 0 6 6 6 6 0 1 1-6-6Z"
    />
  </svg>
}
