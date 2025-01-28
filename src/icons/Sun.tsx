import * as React from "react"
type Props = {
    color:string,
    className:string,
}
export const Sun = (props:Props) => {
    const {color}=props
  return <svg

    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 1.333v1.334m0 10.666v1.334M3.287 3.287l.94.94m7.546 7.546.94.94M1.333 8h1.334m10.666 0h1.334m-10.44 3.773-.94.94m9.426-9.426-.94.94M10.667 8a2.667 2.667 0 1 1-5.334 0 2.667 2.667 0 0 1 5.334 0Z"
    />
  </svg>
}