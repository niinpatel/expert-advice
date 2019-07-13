import React, { useState } from 'react';
import moment from 'moment';
import AnswerQuestion from './AnswerQuestion';
import Answers from './Answers';
import { Button, Typography } from 'antd';

const Question = ({ question, wallet }) => {
  const [answerQuestionModalVisible, setAnswerQuestionModalVisible] = useState(
    false
  );

  const [viewAnswerModalVisible, setViewAnswerModalVisible] = useState(false);

  return (
    <Typography.Paragraph key={question.questionId}>
      {question.questionText} - asked {moment.unix(question.time).fromNow()}
      <Button onClick={() => setAnswerQuestionModalVisible(true)}>
        Add an Answer
      </Button>
      <Button onClick={() => setViewAnswerModalVisible(true)} type="primary">
        View answers
      </Button>
      <AnswerQuestion
        visible={answerQuestionModalVisible}
        closeModal={() => setAnswerQuestionModalVisible(false)}
        questionId={question.questionId}
        wallet={wallet}
      />
      <Answers
        visible={viewAnswerModalVisible}
        closeModal={() => setViewAnswerModalVisible(false)}
        questionId={question.questionId}
      />
    </Typography.Paragraph>
  );
};

export default Question;
