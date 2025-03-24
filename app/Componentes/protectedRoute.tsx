import { useAuth  } from "../Hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const isAuthenticated = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/login");
        }
    }, [isAuthenticated, router]);

    return isAuthenticated ? <>{children}</> : null
};

export default ProtectedRoute;