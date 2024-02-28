import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'

const Profile = ({ user }) => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate(); 
    const handleLogOut = () => {
        logout()
        .then(() => {
            alert("logged Out!");
            navigate("/");
        })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <div className="drawer drawer-end z-50">
            <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label
                    htmlFor="my-drawer-4"
                    className="drawer-button btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        {user?.photoURL ? (
                            <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        ):(
                            <img
                            alt='User Photo Profile'
                            src='./assets/profile_default.png' 
                            />
                        )}
                    </div>
                </label>
            </div>
            <div
                className="drawer-side">
                <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li><a>Profile</a></li>
                    <li><a>Order</a></li>
                    <li><a>Setting</a></li>
                    <li><a onClick={handleLogOut}>Logout</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Profile
