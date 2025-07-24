import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

export function OngRoute() {
    const { decodedUser } = useAuth();
    if (!decodedUser || decodedUser.userRole !== "COLLABORATOR") {
        return <Navigate to="/page-not-found" replace />;
    }
    return <Outlet />;
}