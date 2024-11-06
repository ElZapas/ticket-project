import { useEffect } from "react"
import { useApp } from "../../contexts/useApp"
import { useNavigate } from "react-router-dom";

export default function useAuthGuard(path) {
    const navigate = useNavigate();
    const { user } = useApp()
    useEffect(() => {
        console.log(user);
        
        if (user !== undefined) {
            navigate(path)
        }
    }, [user])
}
