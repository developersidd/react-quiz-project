import { getDatabase, ref, set } from 'firebase/database';
import _ from 'lodash';
import React, { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useQuestions from '../../Hooks/useQuestion';
import Answers from '../Answers';
import MiniPlayer from '../MiniPlayer';
import ProgressBar from '../ProgressBar';
import SetPageTitle from '../SetPageTitle';

const initialState = null;

const reducer = (state, action) => {
    switch (action.type) {
        case "questions":
            action.value.forEach(question => {
                question.options.forEach(option => {
                    option.checked = false;
                });
            });
            return action.value;

        case "answer":
            const questions = _.cloneDeep(state);
            questions[action.questionNumber].options[action.optionIndex].checked = action.value;
            return questions;
        default:
            return state;

    }
}

const Quiz = () => {
    const { videoID } = useParams();
    const { firebaseAuth: { user: { uid } } } = useAuth();
    const { questions, loading, error } = useQuestions(videoID);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    const title = state?.title;
    
    const [qna, dispatch] = useReducer(reducer, initialState);

    // this useEffect is used to create a copy of my questions array as if i could add default falsy value to each question option cqz i will go through controlled form.
    useEffect(() => {
        dispatch({ type: "questions", value: questions });
    }, [questions]);

    
    // handle user selection of quiz answers
    const handleInputChange = (e, index) => {
        dispatch({ type: "answer", value: e.target.checked, questionNumber: currentQuestion, optionIndex: index })
    }

    // handle next button to get tht next question
    // (questions.length - 1) this means current question ta kintu array index nubmer er moton mane 0 - 3 kintu question.length arb 4 hoiya jai jaita mile nah current question number er sathe tai -1 koret hoice last e.  

    const handleNextButton = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion => currentQuestion + 1);
        }
    }

    //handle previous button to get back to the the previous question
    const handlePreviousButton = () => {
        if (currentQuestion >= 1 && currentQuestion <= questions.length) {
            setCurrentQuestion(currentQuestion => currentQuestion - 1)
        }
    }

    // percentage 
    const percentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

    // handle user quiz submit
    const submitQuiz = async (e) => {
        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`)
        await set(resultRef, {
            [videoID]: qna
        });

        navigate(`/result/${videoID}`, { state: qna });
    }
 

    return (
        <div>

            {loading && <div> ...Loading </div>}
            {error && <div> There was an Error! </div>}
            <SetPageTitle title="Quiz" />
            { 
                !loading && !error && qna && qna.length > 0 && (
                    <>
                        <h1>{qna[currentQuestion].title} </h1>
                        <h4>Question can have multiple answers</h4>

                        <Answers
                            input
                            handleChange={handleInputChange}
                            options={qna[currentQuestion].options}
                        />

                        <ProgressBar
                            prev={handlePreviousButton}
                            next={handleNextButton}
                            percentage={percentage}
                            submit={submitQuiz}
                        />
    
                        <MiniPlayer title={title} videoID={videoID} />

                    </>
                )
            }
        </div>
    )
}

export default Quiz