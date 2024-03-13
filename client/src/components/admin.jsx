import React from 'react'
import { MdSpaceDashboard } from "react-icons/md";
import { IoBagCheck } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { FaHandHoldingWater } from "react-icons/fa";
import { BsBasketFill } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa6";
import { FaCircleQuestion } from "react-icons/fa6";

function admin() {
  return (
      <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className=" drawer">
              {/* Page content here */}
              <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
          </div>
          <div className="drawer-side">
              <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                  {/* Sidebar content here */}
                  <li><a> <MdSpaceDashboard /> Dashboard</a></li>
                  <li><a> <IoBagCheck /> Manage Orders</a></li>
                  <li><a> <IoIosAddCircle /> Add Product</a></li>
                  <li><a> <MdSpaceDashboard /> Manage Item</a></li>
                  <li><a> <FaHandHoldingWater /> All User</a></li>
                  <li><a></a></li>
                  <li><a> <MdSpaceDashboard /> Home</a></li>
                  <li><a> <BsBasketFill /> Product</a></li>
                  <li><a> <FaLocationArrow /> Order Tracking</a></li>
                  <li><a> <FaCircleQuestion /> Customer Support</a></li>
              </ul>
          </div>
      </div>
  )
}

export default admin
