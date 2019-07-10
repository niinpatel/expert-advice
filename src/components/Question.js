import React, { useState } from 'react';
import moment from 'moment';
import AnswerQuestion from './AnswerQuestion';
import { Button } from 'antd';

const Question = ({ question, wallet }) => {
  const [visible, setVisible] = useState(false);

  return (
    <p key={question.questionId}>
      {question.questionText} - asked {moment(question.time * 1000).fromNow()}
      <Button onClick={() => setVisible(true)}>Answer</Button>
      <AnswerQuestion
        visible={visible}
        closeModal={() => setVisible(false)}
        questionId={question.questionId}
        wallet={wallet}
      />
    </p>
  );
};

export default Question;
