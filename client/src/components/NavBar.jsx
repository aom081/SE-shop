import React from 'react'

export const NavBar = () => {
    const navItems = (
        <>
            <li>
                <a>Home</a>
            </li>
            <li tabIndex={0}>
                <details>
                    <summary>Category</summary>
                    <ul className="p-2">
                        <li><a>All</a></li>
                        <li><a>Clothing</a></li>
                        <li><a>Accessories</a></li>
                        <li><a>Gadget</a></li>
                        <li><a>Swag</a></li>
                    </ul>
                </details>
            </li>
            <li tabIndex={0}>
                <details>
                    <summary>Services</summary>
                    <ul className="p-2">
                        <li><a>Order online</a></li>
                        <li><a>Order Tracking</a></li>

                    </ul>
                </details>
            </li>
            <li><a>Promotion</a></li>
        </>
    )
    return (
        <header className='max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 translate-all duration-300 ease-in-out'>
            <div className='navbar xl:px-4'>
                <div className="navbar bg-base-100">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button"
                                className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {navItems}
                            </ul>
                        </div>
                        <a className="btn btn-ghost text-xl" href='/'>SE_Nattavut Shop</a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navItems}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <button className="btn btn-ghost btn-circle hidden lg:flex mr-3 items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                        <div
                            tabIndex={0}
                            role='button'
                            className="btn btn-ghost btn-circle hidden lg:flex mr-3 items-center justify-center">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                <span className="badge badge-xs badge-primary indicator-item"></span>
                            </div>
                        </div>
                        <button className="bg-red rounded-full px-5 text-white flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className='w-6 h-6'>
                            
                                <path
                                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                            </svg>
                            Contact us</button>
                    </div>
                </div>
            </div>
        </header>
    )
}
