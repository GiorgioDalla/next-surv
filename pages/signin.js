import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { signIn } from "next-auth/react"
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi"
import { useRouter } from "next/router"
import axios from "axios"


function SignIn() {
    const { connectAsync } = useConnect()
    const { disconnectAsync } = useDisconnect()
    const { isConnected } = useAccount()
    const { signMessageAsync } = useSignMessage()
    const { push } = useRouter()
    
    console.log("please login using  ethereum chain")

    const handleAuth = async () => {
        if (isConnected) {
            await disconnectAsync()
        }

        const { account, chain } = await connectAsync({ connector: new MetaMaskConnector() })

        const userData = { address: account, chain: chain.id, network: "evm" }

        const { data } = await axios.post("/api/auth/request-message", userData, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        const message = data.message

        const signature = await signMessageAsync({ message })

        // redirect user after success authentication to '/user' page
        const { url } = await signIn("credentials", {
            message,
            signature,
            redirect: false,
            callbackUrl: "/",
        })
        /**
         * instead of using signIn(..., redirect: "/user")
         * we get the url from callback and push it to the router to avoid page refreshing
         */
        push(url)
    }

    return (
        <div>
            <img
                src={"/images/logoSignin.jpg"}
                alt="logo"
                className="absolute object-cover h-48 w-96"
            />
            <div className="w-screen h-screen flex justify-center items-center">
                <div className=" w-128 h-96 relative">
                    <p className="ml-14 flex font-sans font-bold text-2xl ">
                        Login and start building surveys
                    </p>
                    <button
                        onClick={() => handleAuth()}
                        className="text-white bg-purple-700 flex-center mt-20 ml-14 justify-center items-center  border border-purple-700 w-96 h-20"
                    >
                        Authenticate via Metamask
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignIn
