import { useLocation, Outlet, Navigate } from "react-router-dom";
import { getLoggedIn } from "..";

export const Authorization = () => {
    const location = useLocation();
    const loggedin = getLoggedIn();

    return loggedin ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export const UnAuthorization = () => {
    const loggedin = getLoggedIn();

    return !loggedin ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
};