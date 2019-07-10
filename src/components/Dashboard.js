import React, { useState, useEffect, Fragment } from 'react';
import AddQuestion from './AddQuestion';
import { Button } from 'antd';
import { getAllQuestions } from '../api';
import Question from './Question';

const Dashboard = ({ walletAddress, wallet }) => {
  const [questions, setQuestions] = useState([]);
  const [askQuestionModal, setAskQuestionModal] = useState(false);

  useEffect(() => {
    getAllQuestions().then(setQuestions);
  }, [walletAddress]);

  return (
    <Fragment>
      <Button
        onClick={() => setAskQuestionModal(true)}
        size="large"
        type="primary"
      >
        Ask a question
      </Button>
      <AddQuestion
        visible={askQuestionModal}
        closeModal={() => setAskQuestionModal(false)}
        wallet={wallet}
      />

      <h1>Feed</h1>
      {questions.length ? (
        questions.map(question => (
          <Question
            question={question}
            wallet={wallet}
            key={question.questionId}
          />
        ))
      ) : (
        <p>
          New questions will appear here, if you have added one recently, please
          wait sometime for it to appear on blockchain.
        </p>
      )}
    </Fragment>
  );
};

export default Dashboard;
