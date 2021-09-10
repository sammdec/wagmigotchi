import { Web3ReactProvider } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"
import { globalCss } from "stitches.config"

import "minireset.css/minireset.css"

function getLibrary(provider: any): Web3Provider {
  return new Web3Provider(provider)
}

const globalStyles = globalCss({
  "@font-face": {
    fontFamily: "VT323",
    src: "url('/fonts/vt323.woff2') format('woff2'), url('/fonts/vt323.woff') format('woff')",
    fontWeight: "normal",
    fontStyle: "normal",
  },

  body: {
    fontFamily: "$mono",
    fontSize: "$2",
  },
})

export default function App({ Component, pageProps }) {
  globalStyles()
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}
