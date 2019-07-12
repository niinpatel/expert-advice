import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';
import { addQuestion } from '../api';
import { endsWithQuestionMark } from "../utils";

const AddQuestion = ({ visible, closeModal, wallet }) => {
  const [loading, setLoading] = useState(false);
  const [questionText, setQuestionText] = useState('');

  const submitForm = async () => {
    if (!questionText) return;

    if(!endsWithQuestionMark(questionText)){
      return message.error('This question should end with a question mark.')
    }

    try {
      setLoading(true);
      await addQuestion(questionText, wallet);
      message.success('Success. Your question will appear in few minutes.');
      resetState();
      closeModal();
    } catch (e) {
      console.log(e);
      message.error(`something went wrong, please try again.`);
    }
  };

  const resetState = () => {
    setQuestionText('');
    setLoading(false);
  };

  return (
    <Modal
      visible={visible}
      onOk={submitForm}
      onCancel={() => closeModal(null)}
      confirmLoading={loading}
    >
      <Input
        type="text"
        placeholder="Add a question..."
        onChange={event => setQuestionText(event.target.value)}
        name="question-text"
        required
        value={questionText}
      />
    </Modal>
  );
};

export default AddQuestion;
