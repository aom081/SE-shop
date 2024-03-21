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
    if(user.role ===  "admin"){
      axiosSecure.patch(`/users/user/${user._id}`).then((res) => {
        refetch();
        Swal.fire({
          icon: "success",
          title: `User ${user.username} is no longer an admin`,
          timer: 1500,
        })
      }).catch((error) => {
        const errorStatus = error?.response?.status;
        const errorMessage = error?.response?.message;
        Swal.fire({
          icon: "error",
          title: `Error! ${errorStatus}: ${errorMessage}`,
          timer: 1500,
        })
      })
  }else{
    axiosSecure.patch(`/users/admin/${user._id}`).then(()=>{
      user.role="admin"
      refetch()
      Swal.fire({
        icon:"info",
        title:`User ${user.username} has been made as Admin`
      })
    })
  }
}

const handleDelete = (user) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (!result.isConfirmed) return;
    axiosSecure.delete(`/users/${user._id}`).then(refetch())
    .catch((err)=>console.log(err))
    Swal.fire(  
      'Deleted!',
      'The User has been deleted.',
      'success'
    )
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
