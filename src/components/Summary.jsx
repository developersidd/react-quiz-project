import React, { useMemo } from 'react';
import successImg from "../assets/images/success.png";
import useFetch from '../Hooks/useFetch';
import classes from "../styles/Summary.module.css";

const Summary = ({ score, noq }) => {

    const getKeyword = useMemo(() => {
        if ((score / (noq * 5) * 100) < 50) {
            return "failed"
        } else if ((score / (noq * 5) * 100) < 75) {
            return "good";
        } else if ((score / (noq * 5) * 100) < 100) {
            return "very good";
        } else {
            return "excellent";
        }
    }, [score, noq]);

    const { loading, error, result } = useFetch(
        `https://api.pexels.com/v1/search?query=${getKeyword}`,
        "GET",
        { Authorization: process.env.REACT_APP_PEXELS_API_KEY }
    );

    const img = result ? result?.photos[Math.floor(Math.random() * 8)].src.medium : successImg;

    return (
        <div className={classes.summary}>
            <div className={classes.point}>
                <p className={classes.score}>
                    Your score is <br />
                    {score} out of {noq * 5}
                </p>
            </div>
            {loading && <div className={classes.badge}> ...Loading your Badge </div>}
            {error && <div className={classes.badge}> An Error occured! </div>}

            {
                !loading && !error && (
                    <div className={classes.badge}>
                        <img src={img} alt="Success" />
                    </div>
                )
            }
        </div>
    )
}

export default Summary
