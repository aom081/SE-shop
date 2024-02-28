import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider';
import { updateProfile } from 'firebase/auth';

const UpdateProfile = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.pathname || "/";
  const {UpdateProfile} = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = UseForm();
  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;
    updateProfile({ name, photoURL })
    .then(() => {
      alert("Profile Update!");
      navigate(from, {replace: true});
    })
    .catch(error => alert(error.message));
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
        <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
          <h3 className='font-bold'> Update Your Profile</h3>
          <div className=' form-control'>
            <label className=' label'>
              <span className=' label-text'> Name</span>
            </label>
            <input 
            type="text" 
            placeholder='Photo URL'
            className=' input input-bordered'
            required
            {...register("photoURL")} 
            />
          </div>

          <div className=' form-control mt-6'>
            <input 
            type="submit"
            value="Update"
            className=' btn bg-red text-white' />
          </div>
        </form>
      </div>     
    </div>
  )
}

export default UpdateProfile
