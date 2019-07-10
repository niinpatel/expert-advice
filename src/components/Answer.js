import React from 'react';
import { Typography, Divider } from 'antd';

const Answer = ({ answer }) => {
  return (
    <div>
      <Typography.Paragraph>
        Answered by {answer.name}, {answer.credential}
      </Typography.Paragraph>
      <Typography.Text>{answer.answer}</Typography.Text>
      <Divider />
    </div>
  );
};

export default Answer;
