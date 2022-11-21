import React from "react"
import Link from "next/link"
import { getSession, signOut } from "next-auth/react"
export default function Navbar() {
    return (
        <div className=" content-center mt-8 ml-auto mr-auto flex  box-border h-15 w-5/6 border-gray-400/25 border-4 shadow-sm rounded-lg">
            <div className="mx--4 flex-auto text-center px-4 py-4 m-2 hover:font-bold ">
                <Link href="/">Home</Link>
            </div>
            <div className="mx--4 flex-auto text-center px-4 py-4 m-2 w-12 hover:font-bold">
                <Link href="/mySurveys">My Surveys</Link>
            </div>
            <div className="mx--4 flex-auto text-center px-4 py-4 m-2 w-14 hover:font-bold">
                <Link href="/NewSurvey">Make a Survey</Link>
            </div>
            <button
                onClick={() => signOut({ redirect: "/signin" })}
                className=" mx--4 ml-24 right-0 px-4 py-4 m-2 text-white bg-purple-700 rounded-lg hover:font-bold"
            >
                <Link href="/signin">Log out</Link>
            </button>
        </div>
    )
}
//  <button onClick={() => signOut({ redirect: "/signin" })}>Sign out</button>
