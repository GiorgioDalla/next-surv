import { createClient, configureChains, WagmiConfig } from "wagmi"

import auroraChain from "../constants/auroraChain"

import { SessionProvider } from "next-auth/react"
import { publicProvider } from "wagmi/providers/public"
import Layout from "../components/layout"
import { useRouter } from "next/router"

import "../styles/globals.css"

const { provider, webSocketProvider } = configureChains(
    [auroraChain],
    [publicProvider()]

    // infuraProvider({ apiKey: process.env.INFURA_API_KEY })
)

const client = createClient({
    provider,
    webSocketProvider,
    autoConnect: true,
})

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const showHeader = router.pathname === "/signin" ? false : true
    return (
        <WagmiConfig client={client}>
            {showHeader && <Layout />}
            <SessionProvider session={pageProps.session} refetchInterval={0}>
                <Component {...pageProps} />
            </SessionProvider>
        </WagmiConfig>
    )
}

export default MyApp
