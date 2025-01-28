import * as React from "react"
type props={
    color:string
}
export const SeeMoreIcon = (props:props) => {
    const {color}=props
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1.333 6h9.333m0 0L6 1.333M10.666 6 6 10.667"
    />
  </svg>
}