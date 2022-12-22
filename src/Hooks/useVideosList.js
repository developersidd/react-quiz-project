import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from "firebase/database";
import { useEffect, useState } from "react";

const useVideosList = (startingNumber) => {


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {

        const fetchVideos = async () => {
            // data related works
            const db = getDatabase();
            const videosRef = ref(db, 'videos');
            const videoQuery = query(
                videosRef,
                orderByKey(),
                startAt("" + startingNumber),
                limitToFirst(8),
            );

            try {
                setError(false);
                setLoading(true);

                // request data 
                const snapshot = await get(videoQuery);

                if (snapshot.exists()) {
                    setError(false);
                    setLoading(false);
                    setVideos((prevVideos) => {
                        return [...prevVideos, ...Object.values(snapshot.val())];
                    });
                }
                else {
                    // this means we have already shown our all snapshots(data)
                    setHasMore(false);
                    setLoading(false);
                }

            }
            catch (err) {
                setLoading(false);
                setError(err);
            }
        };
        fetchVideos();
    }, [startingNumber]);
    return { loading, error, videos, hasMore };

};

export default useVideosList;