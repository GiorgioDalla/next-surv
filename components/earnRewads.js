import * as React from "react"
import { usePrepareContractWrite, useContractWrite } from "wagmi"

import { utils } from "ethers"
import { abi } from "../constants"

export default function earnRewards() {
    const { config } = usePrepareContractWrite({
        address: "0x1b32bc51bf1B3fA61855d540a0fC22E94AC4C068",
        abi: abi,
        functionName: "earnPrize",
    })
    const { write } = useContractWrite(config)

    return (
        <button
            onClick={write}
            className="mb-6 py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
            Claim rewards
        </button>
    )
}
