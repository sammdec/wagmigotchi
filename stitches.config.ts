import { createStitches } from "@stitches/react"

export const { styled, getCssText, globalCss, keyframes } = createStitches({
  theme: {
    fonts: {
      mono: "VT323, monospace",
    },
    colors: {},
    fontSizes: {
      0: "18px",
      1: "24px",
      2: "36px",
      3: "46px",
      4: "56px",
      5: "66px",
      6: "76px",
      7: "86px",
      8: "126px",
    },
    space: {
      0: "0px",
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "32px",
      8: "48px",
      9: "64px",
      10: "96px",
      11: "128px",
    },
  },
})
