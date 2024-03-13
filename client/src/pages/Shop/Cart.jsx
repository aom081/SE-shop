import React, { useContext, useState } from 'react'
import useCart from "../hook/useCart";
import Swal from "sweetalert2";
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [cartItems, setCartItems] = useState(cart);
  const calculateTotalPrice = (item) => (item.price * item.quantity)
  const calculateTotalAllPrice = () => {
    let total = 0;
    cartItems.map((item) => {
      total += calculateTotalPrice(item);
    });
    return total;
  }

  const calculateTotalAllPrice2 = () => {
    cart.reduce((total, item) => total + calculateTotalPrice(item), 0)
  }
  const handleIncrease = async (item) => {
    try {
      const response = await fetch("http://localhost:5000/cart/" + item._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ quantity: item.quantity + 1 })
      })
      if (response.ok) {
        const updateCart = cartItems.map((cartItems) => {
          if (cartItems._id == item._id) {
            return { ...cartItems, quantity: cartItems.quantity + 1 }
          }
          return cartItems
        })
        await refetch();
        setCartItems(updateCart);
      } else {
        console.log('Server responded with a status other than 2xx');
      }
    } catch (error) {
      console.log(error);
    }

  }
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {

      try {
        const response = await fetch("http://localhost:5000/cart/" + item._id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ quantity: item.quantity - 1 })
        })
        if (response.ok) {
          const updateCart = cartItems.map((cartItems) => {
            if (cartItems._id == item._id) {
              return { ...cartItems, quantity: cartItems.quantity - 1 }
            }
            return cartItems
          })
          await refetch();
          setCartItems(updateCart);
        } else {
          console.log('Server responded with a status other than 2xx');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleDelete = async (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      position: "center",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: '#d33',
      showConfirmButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/cart/${item._id}`)
          .then(() => {
            const updatedCart = cartItems.filter((cartItem) => cartItem._id !== item._id);
            setCartItems(updatedCart);
            refetch();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }
  return (
    <div className=' max-w-screen-2xl contents mx-auto xl:px-24 px-4'>
      <div className=' bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%'>
        <div className=' py-28 flex flex-col item center justify-center'>
          <div className='text-center px-4 space-y-7'>
            <h2 className='md:text-5xl text-4xl font-bold '></h2>
          </div>
        </div>
      </div>
      {cart.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className=' bg-red text-white text-center'>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>#</th>
                <th>Product</th>
                <th>Item Name</th>
                <th>Quantity Color</th>
                <th>Product</th>
                <th>Item Name</th>
                <th>Quantity Color</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br />
                  <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                </td>
                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            </tbody>
            {/* item */}
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>

                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={item.image} />
                    </div>
                  </div>
                </td>
                <td className='text-start'>{item.name}</td>
                <td className='flex justify-center'>
                  <button className='btn btn-xs' onClick={() => handleDecrease(item)}>{" "} - {" "}</button>
                  {item.quantity}
                  <button className='btn btn-xs' onClick={() => handleIncrease(item)}>{" "} + {" "} </button>
                </td>
                <td>{item.price}</td>
                <td>{calculateTotalPrice(item)}</td>
                <td>
                  <button className="btn btn-ghost btn-xs" onClick={() => handleDelete(item)}>details</button>
                </td>
              </tr>

            ))
            }

          </table>
          <div>
            Total: ${calculateTotalAllPrice()}
          </div>
          <div className='mt-10'>
            <Link to="/dashboard/payment"><button className='btn bg-red text-white'>Proceed to Payment</button></Link>
          </div>
        </div>
      ) : (
        <div className='text-center mt-20'>
          <p>cart is empty. Please add Product.</p>
          <Link to="/shop"><button className='btn bg-red text-white mt-3'>Back to shop</button></Link>
        </div>
      )}
    </div>
  )
}

export default Cart
