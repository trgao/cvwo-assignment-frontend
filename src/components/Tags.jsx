import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Tags = ({ tags }) => {
    const navigate = useNavigate();

    const handleClick = (name) => {
        navigate('/tag/' + name.split(' ').join('_'));
    };

    return (
        <div className="tags">
            {tags.map(tag => {
                return <Chip 
                    variant="outlined" 
                    label={tag.name} 
                    key={tag.id} 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClick(tag.name);
                    }} 
                />;
            })}
        </div>
    );
};

export default Tags;