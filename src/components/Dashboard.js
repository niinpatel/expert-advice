import React, { useState, useEffect, Fragment } from 'react';
import AddQuestion from './AddQuestion';
import { Button } from 'antd';
import { getAllQuestions } from '../api';
import moment from 'moment';

const Dashboard = ({ walletAddress, wallet }) => {
  const [questions, setQuestions] = useState([]);
  const [askQuestionModal, setAskQuestionModal] = useState(false);

  useEffect(() => {
    getAllQuestions().then(setQuestions);
  }, [walletAddress]);

  return (
    <Fragment>
      <Button onClick={() => setAskQuestionModal(true)}>Ask a question</Button>
      <AddQuestion
        visible={askQuestionModal}
        closeModal={() => setAskQuestionModal(false)}
        wallet={wallet}
      />

      <h1>Feed</h1>
      {questions &&
        questions.map(question => (
          <p key={question.questionId}>
            {question.questionText} - asked{' '}
            {moment(question.time * 1000).fromNow()}
            <Button>Answer</Button>
          </p>
        ))}
    </Fragment>
  );
};

export default Dashboard;
