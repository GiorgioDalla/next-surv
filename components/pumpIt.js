import { abi, contractAddresses } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useNotification } from "web3uikit"

export default function pumpIt() {
    // const { chainId: chainIdHex, isWeb3Enabled, account, Moralis } = useMoralis()
    // const chainId = parseInt(chainIdHex)
    // const wentiAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    // const dispatch = useNotification()

    // const handleSuccess = async function (tx) {
    //     await tx.wait(1)
    //     handleNewNotification(tx)
    //     updateUI()
    // }

    // const handleNewNotification = function () {
    //     dispatch({
    //         type: "info",
    //         message: "Rewards added !",
    //         title: "Transaction Notification",
    //         position: "topR",
    //         icon: "bell",
    //     })
    // }
    // const {
    //     runContractFunction: pumpIt,
    //     data: enterTxResponse,
    //     isLoading,
    //     isFetching,
    // } = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: wentiAddress,
    //     functionName: "pumpIt",
    //     params: {},
    // })
    return (
        <div>
            <button
                // onClick={async () =>
                //     await pumpIt({
                //         // onSuccess: handleSuccess,
                //         onError: (error) => console.log(error), //add it to all my runcontract functions
                //     })
                // }
            >
                add rewards
            </button>
        </div>
    )
}
