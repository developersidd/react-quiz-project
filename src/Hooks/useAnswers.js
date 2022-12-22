import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useAnswers = (videoID) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {

        const fetchAnswers = async () => {
            // data related works
            const db = getDatabase();
            const answersRef = ref(db, 'answers/' + videoID + '/questions');
            const answersQuery = query(
                answersRef,
                orderByKey(),
            );

            try {
                setError(false);
                setLoading(true);

                // get answers data 
                const snapshot = await get(answersQuery);

                if (snapshot.exists()) {
                    setError(false);
                    setLoading(false);
                    setAnswers((prevAnswers) => {
                        return [...prevAnswers, ...Object.values(snapshot.val())];
                    });
                }
            }
            catch (err) {
                setLoading(false);
                setError(err);
                console.log(err)
            }
        };
        fetchAnswers();
    }, [videoID]);
    //console.log("answer loaded", answers);
    return { loading, error, answers };

};

export default useAnswers;