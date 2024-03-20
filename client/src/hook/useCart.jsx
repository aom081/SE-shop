import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../context/AuthProvider'
import useAxiosPublic from './useAxiosPublic';

const useCart = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const { refresh, data: cart = {} } = useQuery({
        queryKey: ["carts", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/carts/${user?.email}`);
            return res.data;
        },
    });
    return [cart, refresh];
};

export default useCart
