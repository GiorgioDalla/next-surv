import * as React from "react"
import { useDebounce } from "use-debounce"
import { utils } from "ethers"
import { usePrepareSendTransaction, useSendTransaction } from "wagmi"

export default function addRew() {
    const [amount, setAmount] = React.useState("")
    const [debouncedValue] = useDebounce(amount, 500)

    const { config } = usePrepareSendTransaction({
        request: {
            to: "0xa3db6208eEfBCeE9695d6A586407dC5cD1E33896",
            value: debouncedValue ? utils.parseEther(debouncedValue) : undefined,
        },
    })
    const { sendTransaction } = useSendTransaction(config)

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                sendTransaction?.()
            }}
        >
            <input
                aria-label="Amount (ether)"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.05"
                value={amount}
            />
            <button onClick={sendTransaction}> Add rewards</button>
        </form>
    )
}
