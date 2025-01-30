import * as React from "react"
type props={
    color:string
}
export const RemoveIcon = (props:props) => {
  return<svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    fill="none"
    {...props}
  >
    <path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 1 1 9m0-8 8 8"
    />
  </svg>
}