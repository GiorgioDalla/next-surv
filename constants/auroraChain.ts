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
        default: "https://testnet.aurora.dev",
        infura:"https://aur52bbfeb3802f490cb97b340eac1ccc69ora-testnet.infura.io/v3/"
    },
    blockExplorers: {
        default: { name: "aurorascan", url: "https://testnet.aurorascan.dev/" },
    },
    testnet: true,
}
export default auroraChain