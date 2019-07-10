import React, { useState, useEffect } from 'react';
import { Modal, Typography } from 'antd';
import { getAnswers } from '../api';
import Answer from './Answer';

const Answers = ({ questionId, visible, closeModal }) => {
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getAnswers({ questionId }).then(answers => {
      setLoading(false);
      setAnswers(answers);
    });
  }, [questionId]);

  return (
    <Modal visible={visible} onCancel={() => closeModal(null)} footer={null}>
      {loading ? (
        'loading...'
      ) : answers.length ? (
        answers.map(answer => (
          <Answer answer={answer} key={JSON.stringify(answer)} />
        ))
      ) : (
        <Typography.Paragraph>
          There are no answers yet. If you have added one recently, please wait
          some time for it to appear.
        </Typography.Paragraph>
      )}
    </Modal>
  );
};

export default Answers;
