import React from 'react'
import useAxiosSecure from '../../../hook/useAuthSecure'
import Swal from 'sweetalert2'
import { useQuery } from '@tanstack/react-query'
import { FaTrashAlt } from 'react-icons/fa'

const User = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users")
      return res.data;
    }
  })

  const handleMakeAdmin = (user) => {
    //TODO api from user.router.js 
    //use axiosSecure
    
    Swal.fire({
      title: "Are you sure?", 
      text: `User ${user.username} will be made admin!`,  
      icon: "warning", 
      showCancelButton: true, 
      confirmButtonText: "Yes, make it!" ,
      cancelButtonText: "No"
    }).then(async result => {
      if (!result.isConfirmed) return;
      try{
        let res = await axiosSecure.post(`/makeadmin/${user._id}`);
        
        Swal.fire("Made Admin!","The user has been made an admin.", "success");
        refetch()
      }catch(err){
        console.log(err)  
        Swal.showValidationMessage(`Request failed: ${err}`);
      }
     });


    Swal.fire({
      title: `Are you sure to make  ${user.username} as admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(async result => {
      if (!result.isConfirmed) return;
      try {
        const res = await axiosSecure.patch(`/make-admin/${user._id}`);
        Swal.fire("Success!", `${res.data.msg}`, "success");
        refetch()
      } catch (err) { 
        console.log(err)
        Swal.fire("Error!",  err.response?.data.error || "Something went wrong.", "error");
      }
    });

    console.log(user);
    Swal.fire({
      title: "Are you sure?",   
      text: `User ${user.username} will be made admin`,    
      icon: "warning",  
      showCancelButton: true,  
      confirmButtonText: "Yes, make it!",
      cancelButtonText: "No, cancel!"            
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post(`/admin/${user._id}`).then(()=>{ 
          Swal.fire("Made Admin!","User has been made an admin.", "success");
          refetch()
        });                
      } else if (result.isDismissed) {  
        Swal.fire("Canceled!","You can keep the user as a normal user :)","error");
      }
    })
  }
  return (
    <div>
      <div className='flex justify-between mx-4 my-4'>
        <h2 className=' text-2xl'> All user </h2>
        <h2 className=' text-2xl'>Total Users: {users.length} </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra md:w-[870px]">
          {/* head */}
          <thead className='bg-red text-white text-center'>
            <tr>
              <th>
                <label>
                  #
                </label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
            {users.map((user, index) => (
              <tr key={index} className='text-center'>
                <th>
                  <label>
                    {index + 1}
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.photoURL}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className=" font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <p> User</p>
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    onClick={handleMakeAdmin}
                    checked={user.role === "admin"} />
                  <p>Admin</p>
                </td>

                <th>
                  <button className="btn btn-ghost btn-xs bg-orange-600">
                    <FaTrashAlt />
                  </button>
                </th>
              </tr>
            ))}


          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot>

        </table>
      </div>
    </div>
  )
}

export default User
