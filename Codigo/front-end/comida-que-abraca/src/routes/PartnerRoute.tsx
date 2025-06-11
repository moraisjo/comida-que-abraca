import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

export function PartnerRoute() {
    const { decodedUser } = useAuth();
    if (!decodedUser || decodedUser.userId == "1") {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}