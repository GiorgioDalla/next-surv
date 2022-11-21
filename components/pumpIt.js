import * as React from "react"
import { useDebounce } from "use-debounce"
import { utils } from "ethers"
import { usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from "wagmi"

export default function addRew() {
    const [amount, setAmount] = React.useState("")
    const [debouncedValue] = useDebounce(amount, 500)

    const { config } = usePrepareSendTransaction({
        request: {
            to: "0x1b32bc51bf1B3fA61855d540a0fC22E94AC4C068",
            value: debouncedValue ? utils.parseEther(debouncedValue) : undefined,
        },
    })
    const { data, sendTransaction } = useSendTransaction(config)
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })
    console.log(data)

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                sendTransaction?.()
            }}
        >
            <button
                // disabled={isLoading || !sendTransaction || !amount}
                onClick={sendTransaction}
                className=" mb-6 py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                disabled={isLoading || !sendTransaction || !amount}
            >
                {isLoading ? "Adding..." : "add rewards"}
            </button>
            {/* {isSuccess && (
                <div>
                    Successfully added {amount} ether
                    <div>
                        <a href={`https://testnet.aurorascan.dev/tx/${data?.hash}`}>Aurora Scan</a>
                    </div>
                </div>
            )} */}
            <input
                aria-label="Amount (ether)"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.05 Eth"
                type="number"
                value={amount}
                className=" ml-3 border-2 border-gray rounded-lg shadow-sm focus: outline-none focus: border-gray-200"
            />
        </form>
    )
}
