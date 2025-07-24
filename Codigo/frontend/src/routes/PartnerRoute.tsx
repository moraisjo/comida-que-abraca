import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

export function PartnerRoute() {
    const { decodedUser } = useAuth();
    if (!decodedUser || decodedUser.userRole !== "PARTNER") {
        return <Navigate to="/page-not-found" replace />;
    }
    return <Outlet />;
}