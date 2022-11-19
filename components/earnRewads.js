import * as React from "react"
import { usePrepareContractWrite, useContractWrite } from "wagmi"

import { utils } from "ethers"
import { abi } from "../constants"

export default function earnRewards() {
    const { config } = usePrepareContractWrite({
        address: "0xa3db6208eEfBCeE9695d6A586407dC5cD1E33896",
        abi: abi,
        functionName: "earnPrize",
    })
    const { write } = useContractWrite(config)

    return <button onClick={write}>Claim rewards</button>
}
