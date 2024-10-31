import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useNotAuthGuard() {
    const localToken = localStorage.getItem('token');
    const sessionToken = sessionStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localToken && !sessionToken) {
            navigate('/')
        }
    }, [])
}
