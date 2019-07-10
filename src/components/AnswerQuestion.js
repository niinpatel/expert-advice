import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';
import { answerQuestion } from '../api';
const { TextArea } = Input;

const AnswerQuestion = ({ visible, closeModal, wallet, questionId }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [credential, setCredential] = useState('');
  const [answer, setAnswer] = useState('');

  const submitForm = async () => {
    if (!name || !credential || !wallet) {
      return message.error('Please fill all required fields');
    }

    try {
      setLoading(true);
      console.log(name, credential, answer);
      await answerQuestion({ name, credential, answer, questionId }, wallet);
      message.success('Success. Your answer will appear in few minutes.');
      resetState();
      closeModal();
    } catch (e) {
      console.log(e);
      message.error(`something went wrong, please try again.`);
    }
  };

  const resetState = () => {
    setName('');
    setCredential('');
    setAnswer('');
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
        placeholder="Your name...*"
        onChange={event => setName(event.target.value)}
        name="name"
        required
        value={name}
      />

      <Input
        type="text"
        placeholder='Your credential...* example, "Worked 10 years as a Java Programmer"'
        onChange={event => setCredential(event.target.value)}
        name="credential"
        required
        value={credential}
      />
      <p>Make sure the credential is related to the question.</p>

      <TextArea
        placeholder="Your answer here*"
        autosize={{ minRows: 2, maxRows: 20 }}
        name="answer"
        required
        value={answer}
        onChange={e => setAnswer(e.target.value)}
      />
    </Modal>
  );
};

export default AnswerQuestion;
