import { styled } from "stitches.config"

const Button = styled("div", {
  display: "inline-flex",
  border: "4px solid black",
  paddingLeft: "$4",
  paddingRight: "$4",
  paddingBottom: "$2",
  fontSize: "$2",
  cursor: "pointer",
  "&:hover": {
    opacity: 0.6,
  },
  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        cursor: "not-allowed",
        "&:hover": {
          opacity: 0.5,
        },
      },
    },
  },
})

export default Button
