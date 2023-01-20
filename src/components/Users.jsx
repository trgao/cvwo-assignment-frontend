import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Users = ({ users }) => {
    const navigate = useNavigate();

    const handleClick = (name) => {
        navigate('/user/' + name);
    };

    return (
        <div className="users">
            {users.map(user => {
                return <Chip variant="outlined" label={user.username} key={user.id} onClick={() => handleClick(user.username)} />;
            })}
        </div>
    );
};

export default Users;