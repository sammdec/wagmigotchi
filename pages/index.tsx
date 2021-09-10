import Box from "components/Box"
import Text from "components/Text"
import Button from "components/Button"
import { keyframes } from "stitches.config"
import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from "@web3-react/injected-connector"
import { providers } from "ethers"
import { contract } from "contract"
import { useEffect, useState } from "react"
import d3 from "d3-scale"

enum Action {
  Feed,
  Clean,
  Play,
  Sleep,
}

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

const float = keyframes({
  "0%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(4px)" },
  "99%": { transform: "translateY(-4px)" },
  "100%": { transform: "translateY(-4px)" },
})

const injected = new InjectedConnector({ supportedChainIds: [1, 5] })

const provider = new providers.AlchemyProvider(
  1,
  "hIvTka6DNWSrY6Z9o-XUz1ey6k_lBfJO"
)

const getStatusColor = (percent) => {
  if (percent <= 33) {
    return "#FF004D"
  }
  if (percent > 33 && percent <= 66) {
    return "#FFEC27"
  }
  return "#00E436"
}

export default function Home() {
  const [status, setStatus] = useState(null)
  const [boredom, setBoredom] = useState(null)
  const [uncleanliness, setUncleanliness] = useState(null)
  const [hunger, setHunger] = useState(null)
  const [sleepiness, setSleepiness] = useState(null)
  const [alive, setAlive] = useState(null)
  const { activate, deactivate, active, library, chainId, account } =
    useWeb3React()

  const readContract = contract.connect(provider)

  const onConnect = async () => {
    await activate(injected)
  }

  const onDisconnect = () => {
    deactivate()
  }

  const onAction = (action: Action) => {
    if (!active) {
      return
    }
    const actionContract = contract.connect(library.getSigner())

    switch (action) {
      case Action.Clean:
        break
      case Action.Feed:
        break
      case Action.Play:
        break
      case Action.Sleep:
        break
    }
  }

  useEffect(() => {
    const getStatuses = async () => {
      const status = await readContract.getStatus()
      const boredom = await readContract.getBoredom()
      const uncleanliness = await readContract.getUncleanliness()
      const hunger = await readContract.getHunger()
      const sleepiness = await readContract.getSleepiness()
      const alive = await readContract.getAlive()
      setStatus(status)
      setBoredom(boredom)
      setUncleanliness(uncleanliness)
      setHunger(hunger)
      setSleepiness(sleepiness)
      setAlive(alive)
    }
    getStatuses()
  }, [])

  console.log({
    boredom,
    uncleanliness,
    hunger,
    sleepiness: sleepiness?.toString(),
  })

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
          <Text css={{ marginLeft: "$3" }}>
            Connected as {account.substring(0, 6)}...
          </Text>
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
            backgroundColor: "LightGray",
            borderRadius: 10,
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 30,
            paddingBottom: 30,
          }}
        >
          <Box
            as="img"
            src="/character.png"
            css={{
              maxWidth: 200,
              animation: alive ? `${float} 1000ms infinite` : "none",
              opacity: alive ? 1 : 0.1,
            }}
          />
        </Box>
      </Box>
      <Box
        css={{
          border: "4px solid black",
          paddingBottom: "$3",
          paddingLeft: "$4",
          paddingRight: "$4",
          marginBottom: "$8",
        }}
      >
        <Box as="span" css={{ animation: `${blink} 1000ms infinite` }}>
          &gt;
        </Box>{" "}
        <Text as="span">{status}</Text>
      </Box>

      <Box>
        <Box>
          <Text>Boredom</Text>
          <Box css={{ position: "relative", height: 20 }}>
            <Box
              css={{
                position: "absolute",
                height: 1,
                borderTop: `20px solid ${getStatusColor(100 - boredom)}`,
                width: `${100 - boredom}%`,
                zIndex: 1,
              }}
            />

            <Box
              css={{
                width: "100%",
                position: "absolute",
                height: 1,
                borderTop: "20px solid LightGray",
              }}
            />
          </Box>
        </Box>

        <Box>
          <Text>Uncleanliness</Text>
          <Box css={{ position: "relative", height: 20 }}>
            <Box
              css={{
                position: "absolute",
                height: 1,
                borderTop: `20px solid ${getStatusColor(100 - uncleanliness)}`,
                width: `${100 - uncleanliness}%`,
                zIndex: 1,
              }}
            />

            <Box
              css={{
                width: "100%",
                position: "absolute",
                height: 1,
                borderTop: "20px solid LightGray",
              }}
            />
          </Box>
        </Box>

        <Box>
          <Text>Hunger</Text>
          <Box css={{ position: "relative", height: 20 }}>
            <Box
              css={{
                position: "absolute",
                height: 1,
                borderTop: `20px solid ${getStatusColor(100 - hunger)}`,
                width: `${100 - hunger}%`,
                zIndex: 1,
              }}
            />

            <Box
              css={{
                width: "100%",
                position: "absolute",
                height: 1,
                borderTop: "20px solid LightGray",
              }}
            />
          </Box>
        </Box>

        <Box>
          <Text>Sleepiness</Text>
          <Box css={{ position: "relative", height: 20 }}>
            <Box
              css={{
                position: "absolute",
                height: 1,
                borderTop: `20px solid ${getStatusColor(100 - sleepiness)}`,
                width: `${100 - sleepiness}%`,
                zIndex: 1,
              }}
            />

            <Box
              css={{
                width: "100%",
                position: "absolute",
                height: 1,
                borderTop: "20px solid LightGray",
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        css={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "$8",
          marginBottom: "$9",
        }}
      >
        <Button disabled={!active} onClick={() => onAction(Action.Clean)}>
          Clean
        </Button>
        <Button disabled={!active} onClick={() => onAction(Action.Feed)}>
          Feed
        </Button>
        <Button disabled={!active} onClick={() => onAction(Action.Play)}>
          Play
        </Button>
        <Button disabled={!active} onClick={() => onAction(Action.Sleep)}>
          Sleep
        </Button>
      </Box>
    </Box>
  )
}
