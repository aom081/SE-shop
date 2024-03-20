import useAuth from "./userAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: process.env.VITE_API_URL,
});
const useAxiosSecure = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
}