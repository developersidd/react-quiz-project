import _ from 'lodash';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useAnswers from '../../Hooks/useAnswers';
import Analysis from '../Analysis';
import SetPageTitle from '../SetPageTitle';
import Summary from '../Summary';
const Result = () => {
  const { videoID } = useParams();

  const { answers, loading, error } = useAnswers(videoID);
  const location = useLocation();
  const questions = location.state;

  const getQuizScore = () => {
    let score = 0;
    answers.forEach((answer, index1) => {
      let correctIndexes = [];
      let checkedIndexes = [];

      answer.options.forEach((option, index2) => {
        if (option.correct) {
          correctIndexes.push(index2);
        }
        if (questions[index1].options[index2].checked) {
          checkedIndexes.push(index2);
          option.checked = true;
        }
      });

      if (_.isEqual(correctIndexes, checkedIndexes)) {
        score = score + 5;
      }
    });
    return score;
  };

  const userScore = getQuizScore();

  return (
    <div>
      {loading && <div> ...Loading </div>}
      {error && <div> There was an Error! </div>}
      <SetPageTitle title="Result" />

      {!loading && !error && questions && questions.length > 0 && (
        <>
          <Summary score={userScore} noq={questions.length} />
          <Analysis  answers={answers} />
        </>
      )
      }
    </div>
  )
}

export default Result
