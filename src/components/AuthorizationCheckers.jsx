import { useLocation, Outlet, Navigate } from "react-router-dom";
import { getLoggedIn } from "..";

//check if user is logged in to allow access to certain pages, 
//if not redirect them to login page
export const Authorization = () => {
    const location = useLocation();
    const loggedin = getLoggedIn();

    return loggedin ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

//check if user is logged in to redirect them 
//from login and signup pages to home page
export const UnAuthorization = () => {
    const loggedin = getLoggedIn();

    return !loggedin ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
};