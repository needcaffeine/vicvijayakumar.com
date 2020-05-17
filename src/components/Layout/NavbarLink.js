import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React from 'react'

function NavbarLink({ type = 'desktop', href, label }) {
    const className =
        type === 'desktop'
            ? 'ml-4 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out'
            : 'mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out'

    const { pathname } = useRouter()
    const activeClass = pathname.startsWith(href) ? 'text-black font-bold' : 'text-gray-600'

    return (
        <Link href={href}>
            <a className={`${className} ${activeClass}`}>{label}</a>
        </Link>
    )
}

NavbarLink.propTypes = {
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

export default NavbarLink
