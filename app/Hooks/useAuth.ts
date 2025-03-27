import { useEffect, useState} from "react";

export const useAuth = () => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setAuthenticated(!!token);
    }, []);

    return authenticated;
}