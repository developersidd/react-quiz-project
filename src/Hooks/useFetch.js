import { useEffect, useState } from "react";

const useFetch = (url, method, headers) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [result, setResult] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await fetch(url, {
                    method: method || "GET",
                    headers: headers,
                });
                const data = await response.json();
                setLoading(false);
                setResult(data);
            } catch (err) {
                setLoading(false);
                setError(err.message);
            }
        }

        fetchData();

    }, []);
    
    return {
        loading,
        error,
        result,
    }
};

export default useFetch;