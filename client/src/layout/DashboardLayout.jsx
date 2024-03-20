import React from 'react'
import { Link } from 'react-router-dom'
import { logo } from "/logo.jpg"
import { MdSpaceDashboard } from "react-icons/md";
import { IoBagCheck } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { FaHandHoldingWater } from "react-icons/fa";
import { BsBasketFill } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa6";
import { FaCircleQuestion } from "react-icons/fa6";
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    const isAdmin = true;
    return (
        <div>
            {isAdmin ?(
                <div className="drawer lg:drawer-open">
                    <input
                        id="my-drawer"
                        type="checkbox"
                        className="drawer-toggle" />
                    <div className=" drawer-content flex flex-col items-center justify-center my-2">
                        {/* Page content here */}
                        <div className='flex items-center justify-between mx-4'>
                            <label
                                htmlFor="my-drawer-2"
                                className="btn btn-primary drawer-button lg:hidden">
                                <MdSpaceDashboard />Open drawer
                            </label>
                            <button className='btn btn-error sm:hidden flex items-center gap-2'>
                                <FaHandHoldingWater />Logout
                            </button>
                            <div className='mt-5 md:mt-2 mx-4'>
                                Content
                                <Outlet />
                            </div>
                        </div>

                    </div>
                    <div className="drawer-side">
                        <label
                            htmlFor="my-drawer"
                            aria-label="close sidebar"
                            className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            {/* Sidebar content here */}
                            <li>
                                <Link to="/dashboard" className="flex justify-start mb-3">
                                    <img src={logo} className='w-20' />
                                    <div className='badge badge-primary'> Admin </div>
                                </Link>
                            </li>
                            <hr />
                            <li><a> <MdSpaceDashboard /> Dashboard</a></li>
                            <li><a> <IoBagCheck /> Manage Orders</a></li>
                            <li><a> <IoIosAddCircle /> Add Product</a></li>
                            <li><a> <MdSpaceDashboard /> Manage Item</a></li>
                            <li><a> <FaHandHoldingWater /> All User</a></li>
                            <hr />
                            <li><a> <MdSpaceDashboard /> Home</a></li>
                            <li><a> <BsBasketFill /> Product</a></li>
                            <li><a> <FaLocationArrow /> Order Tracking</a></li>
                            <li><a> <FaCircleQuestion /> Customer Support</a></li>
                        </ul>
                    </div>
                </div>
            ):(
                <div>
                    <Link to="/" className='btn btn-sx btn-error sm:btn-sm md:btn-md'> you are not Admin,Return to Home</Link>
                </div>
            )}
           
        </div>
    )
}

export default DashboardLayout
