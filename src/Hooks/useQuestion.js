import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

const useQuestions = (videoID) => {


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {

        const fetchQuestions = async () => {
            // data related works
            const db = getDatabase();
            const quizRef = ref(db, 'quiz/' + videoID + '/questions');
            const quizQuery = query(
                quizRef,
                orderByKey(),
            );

            try {
                setError(false);
                setLoading(true);

                // request data 
                const snapshot = await get(quizQuery);

                if (snapshot.exists()) {
                    setError(false);
                    setLoading(false);
                    setQuestions((prevQuestions) => {
                        return [...prevQuestions, ...Object.values(snapshot.val())];
                    });
                }
            }
            catch (err) {
                setLoading(false);
                setError(err);
            }
        };
        fetchQuestions();
    }, [videoID]);

    return { loading, error, questions, };

};

export default useQuestions;