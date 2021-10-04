import Box from "components/Box"
import Text from "components/Text"
import Button from "components/Button"
import { keyframes, css } from "stitches.config"
import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from "@web3-react/injected-connector"
import { providers } from "ethers"
import { contract, pfpContract } from "contract"
import { useEffect, useState } from "react"
import Star from "components/Star"

const blink = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: "0" },
})

const colorShift = keyframes({
  "0%": { color: "#FF004D" },
  "15%": { color: "#00E436" },
  "33%": { color: "#FF77A8" },
  "50%": { color: "#29ADFF" },
  "65%": { color: "#83769C" },
  "78%": { color: "#FFA300" },
  "88%": { color: "#FFEC27" },
  "100%": { color: "#FF77A8" },
})

const backgroundShift = keyframes({
  "0%": { backgroundColor: "rgba(255, 0, 77, 0.2)" },
  "15%": { backgroundColor: "rgba(0, 228, 54, 0.2)" },
  "33%": { backgroundColor: "rgba(255, 119, 168, 0.2)" },
  "50%": { backgroundColor: "rgba(41, 173, 255, 0.2)" },
  "65%": { backgroundColor: "rgba(131, 118, 156, 0.2)" },
  "78%": { backgroundColor: "rgba(255, 163, 0, 0.2)" },
  "88%": { backgroundColor: "rgba(255, 236, 39, 0.2)" },
  "100%": { backgroundColor: "rgba(255, 119, 168, 0.2)" },
})

const float = keyframes({
  "0%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(4px)" },
  "99%": { transform: "translateY(-4px)" },
  "100%": { transform: "translateY(-4px)" },
})

const starStyles = css({
  width: 30,
  color: "rgba(255, 236, 39, 1)",
  position: "absolute",
  animation: `${blink} 1000ms infinite both alternate`,
})

const star1 = css(starStyles, { top: "-20%", left: "33%" })()
const star2 = css(starStyles, {
  top: "20%",
  left: "30%",
  animationDelay: "120ms",
})()
const star3 = css(starStyles, {
  top: "80%",
  left: "70%",
  animationDelay: "746ms",
})()
const star4 = css(starStyles, {
  top: "110%",
  left: "90%",
  animationDelay: "190ms",
})()
const star5 = css(starStyles, {
  top: "40%",
  left: "80%",
  animationDelay: "300ms",
})()

const injected = new InjectedConnector({ supportedChainIds: [1, 5] })

const provider = new providers.AlchemyProvider(
  1,
  "hIvTka6DNWSrY6Z9o-XUz1ey6k_lBfJO"
)

const readContract = contract.connect(provider)

export default function Home() {
  const [love, setLove] = useState(null)
  const [tx, setTx] = useState(null)
  const { activate, deactivate, active, library, account } = useWeb3React()

  const getLove = async (account) => {
    if (!account) {
      return
    }
    const love = await readContract.love(account)
    setLove(love.toNumber())
  }

  const onConnect = async () => {
    await activate(injected)
  }

  const onDisconnect = () => {
    setTx(null)
    setLove(null)
    deactivate()
  }

  const onMint = async () => {
    if (!active) {
      return
    }

    const actionPfpContract = pfpContract.connect(library.getSigner())
    const tx = await actionPfpContract.mint()
    setTx(tx.hash)
  }

  useEffect(() => {
    getLove(account)
  }, [account])

  return (
    <Box
      css={{
        maxWidth: 780,
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "$6",
        paddingRight: "$6",
      }}
    >
      <Text css={{ marginBottom: "$4", display: "flex", alignItems: "center" }}>
        <Box
          as="span"
          css={{ animation: `${blink} 1000ms infinite`, marginRight: "$3" }}
        >
          &gt;
        </Box>{" "}
        <Box
          as="span"
          css={{
            fontSize: "$4",
            animation: `${colorShift} 1000ms infinite alternate`,
          }}
        >
          WAGMIGOTCHI
        </Box>
      </Text>

      <Box css={{ display: "flex", alignItems: "center" }}>
        {!active ? (
          <Button onClick={onConnect}>Connect Wallet</Button>
        ) : (
          <Button onClick={onDisconnect}>Disconnect Wallet</Button>
        )}
        {active && (
          <Box css={{ marginLeft: "$3" }}>
            <Text css={{ lineHeight: 1 }}>
              Connected as {account.substring(0, 6)}...
            </Text>
            <Box css={{ display: "flex", alignItems: "flex-end" }}>
              <Box
                as="img"
                src="/love.png"
                css={{ width: 24, marginRight: "$1", paddingBottom: 5 }}
              />
              {love && <Text css={{ lineHeight: 1 }}>{love}</Text>}
            </Box>
          </Box>
        )}
      </Box>

      <Box
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 100,
          marginBottom: "$8",
        }}
      >
        <Box
          css={{
            display: "flex",
            borderRadius: 10,
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 30,
            paddingBottom: 30,
            animation: `${backgroundShift} 4000ms infinite alternate`,
            position: "relative",
          }}
        >
          <Box
            as="img"
            src="/character.png"
            css={{
              maxWidth: 200,
              animation: `${float} 1000ms infinite`,
            }}
          />
          <Star className={star1} />
          <Star className={star2} />
          <Star className={star3} />
          <Star className={star4} />
          <Star className={star5} />
        </Box>
      </Box>
      <Box
        css={{
          border: "4px solid black",
          paddingBottom: "$3",
          paddingLeft: "$4",
          paddingRight: "$4",
          marginBottom: "$8",
          position: "relative",
        }}
      >
        <Box as="span" css={{ animation: `${blink} 1000ms infinite` }}>
          &gt;
        </Box>{" "}
        <Text as="span">dear caretakers</Text>
        <Text css={{ lineHeight: 1, marginBottom: "$6" }}>
          i had a very nice time in ur world & im having a great time in the
          next one!
        </Text>
        <Text css={{ lineHeight: 1, marginBottom: "$6" }}>
          ive made lots of friends with good vibes
        </Text>
        <Text css={{ lineHeight: 1, marginBottom: "$6" }}>
          bc u were so nice, i wanna send u some ~postcards from paradise~ (or
          "pfps"!)
        </Text>
        <Text css={{ lineHeight: 1, marginBottom: "$6" }}>
          connect ur wallet and mint them from the button below
        </Text>
        <Text>miss u lots</Text>
        <Text>💌 wagmigotchi</Text>
        <Star className={star2} />
        <Star className={star3} />
        <Star className={star5} />
      </Box>
      {love > 0 && (
        <Box
          css={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "$8",
          }}
        >
          <Button onClick={onMint}>Mint Postcard</Button>
        </Box>
      )}

      {tx && (
        <Box
          css={{
            display: "flex",
            marginBottom: "$9",
            justifyContent: "center",
          }}
        >
          <Box
            as="a"
            target="_blank"
            href={`https://etherscan.com/tx/${tx}`}
            css={{ color: "black" }}
          >
            Transaction Link
          </Box>
        </Box>
      )}
    </Box>
  )
}
