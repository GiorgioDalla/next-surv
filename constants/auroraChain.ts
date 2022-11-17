import { Chain } from "wagmi"

const auroraChain: Chain  = {
    id: 1313161555,
    name: "Aurora",
    network: "aurora testnet",
    nativeCurrency: {
        decimals: 18,
        name: "Ethereum",
        symbol: "ETH",
    },
    rpcUrls: {
        default: "https://testnet.aurora.dev/",
    },
    blockExplorers: {
        default: { name: "aurorascan", url: "https://testnet.aurorascan.dev/" },
    },
    testnet: true,
}
export default auroraChain