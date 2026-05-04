import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedCreationRoute: FC<PropsWithChildren> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return null;
    if (!user) return <Navigate to="/sign_in" replace />;

    const pendingUid = sessionStorage.getItem('pendingProfileSetup');
    if (pendingUid !== user.uid) return <Navigate to="/profile" replace />;

    return <>{children}</>;
};

export default ProtectedCreationRoute;
