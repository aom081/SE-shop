import React from 'react'
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAuthSecure";
import useAuth from './userAuth';

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, "isAdmin"],
        queryFn: async () => {
            const res = await  axiosSecure.get("/users/admin/" + user?.email);
            return res.data.isAdmin;
        }
    })
    return [isAdmin, isAdminLoading];
}

export default useAdmin
