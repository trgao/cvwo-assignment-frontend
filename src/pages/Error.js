import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Error() {
    return (
        <div id="error">
            <Navbar />
            <div className="main">
                <h1>404 Page Not Found</h1>
                <Link to="/"><Button>Go Home</Button></Link>
            </div>
        </div>
    );
}

export default Error;