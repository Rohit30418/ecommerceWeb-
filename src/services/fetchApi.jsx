import React, { useState } from "react";
import axios from "axios";

export const fetchApi = () => {
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const apidata = (endPoint) => {
        setLoading(true);
        axios.get(`https://dummyjson.com/${endPoint}`)
            .then((response) => {
                setResponse(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };

    return { loading, response, error, apidata };
};
