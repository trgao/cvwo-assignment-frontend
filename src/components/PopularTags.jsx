import axios from "axios";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import Tags from "./Tags";

const PopularTags = () => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        axios.get('https://nusgossip-api.onrender.com/api/v1/tags')
            .then(response => setTags(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <Box>
            {tags.length === 0
            ? <></>
            : <div id="populartags">
                <p>Popular Tags</p>
                <Tags tags={tags} />
            </div>}
        </Box>
    );
};

export default PopularTags;