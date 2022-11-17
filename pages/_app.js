import {
    chain,
    createClient,
    configureChains,
    defaultChains,
    WagmiConfig,
    // useAccount,
    // useConnect,
    // useDisconnect,
    // useEnsAvatar,
    // useEnsName,
} from "wagmi"
import { MoralisProvider } from "react-moralis"
import auroraChain from "../constants/auroraChain"
import { publicProvider } from "wagmi/providers/public"
import { SessionProvider } from "next-auth/react"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"

const { provider, webSocketProvider, chains } = configureChains(
    [auroraChain],
    [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })]
)

const client = createClient({
    provider,
    webSocketProvider,
    autoConnect: true,
})

function MyApp({ Component, pageProps }) {
    return (
        <WagmiConfig client={client}>
            <SessionProvider session={pageProps.session} refetchInterval={0}>
                <Component {...pageProps} />
            </SessionProvider>
        </WagmiConfig>
    )
}

export default MyApp
