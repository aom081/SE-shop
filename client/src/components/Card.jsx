import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";

const Card = ({ item }) => {
    const { _id, name, image, price, description } = item;
    const {email}  = localStorage.getItem('userInfo');

    const [isHeartFilled, setIsHeartFilled] = React.useState(false);
    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
    };

    const handleAddToCart = (item) => {
        if(user && user.email){
        const cartItem = {
            productId: item._id,
            email: user.email,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: 1,
        };
        Swal.fire({
            title: "Product added on the cart",
            position: "center",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
        });
        axios.post("http//location:5000/carts",cartItem).then(
            res=>{console.log(res)}
        )
    }else {
        Swal.fire({     
          icon: "error",  
          title: "Login to add this product!",    
          text: "Browse our products or Sign Up / Login" ,                
          confirmButtonText: "Sign In",            
          confirmButtonColor:"#ff6347",
          showCancelButton: true,                            
          cancelButtonColor: "#d33",
          reverseButtons: true ,                            
        }).then((result) => {
            if (result.value) {
                window.location="/signin";
            }  
        })
    } 
}

    return (
        <div className='card shadow-xl relative mr-5 md:my-5'>
            <div
                className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-red ${isHeartFilled ? "text-rose-500" : " text-white"
                    } `}
                onClick={handleHeartClick} >
                <svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>

            </div>
            <Link>
                <figure>
                    <img
                        src={image}
                        alt=""
                        className=' hover:scale-105 transition-all duration-300 md:h-72'
                    />
                </figure>
            </Link>
            <div className='card-body'>
                <Link>
                    <h2 className='card-title'>{name}</h2>
                </Link>
                <p>{description}</p>
                <div className=' card-actions justify-between items-center mt-2'>
                    <h5 className=' font-semibold'>{price}</h5>
                    <button className=' btn bg-red text-white' onClick={handleAddToCart}> Add to cart</button>
                </div>
            </div>

        </div>
    )
}

export default Card

