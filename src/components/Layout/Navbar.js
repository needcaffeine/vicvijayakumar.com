import React from 'react'
import Link from 'next/link'

function Navbar() {
    return (
        <div className="relative overflow-hidden bg-white">
            <div className="relative pt-6 pb-8">
                <nav className="relative flex items-center justify-between max-w-screen-lg px-4 mx-auto sm:px-6">
                    <div className="flex items-center flex-1">
                        <div className="flex items-center justify-between w-full md:w-auto">
                            <Link href="/">
                                <a className="text-2xl hover:text-gray-500">Home</a>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar
