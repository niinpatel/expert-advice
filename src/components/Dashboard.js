import React, { useState, useEffect, Fragment } from 'react';
import AddQuestion from './AddQuestion';
import { Button } from 'antd';

const Dashboard = ({ walletAddress, wallet }) => {
  const [askQuestionModal, setAskQuestionModal] = useState(false);
  return (
    <Fragment>
      <Button onClick={() => setAskQuestionModal(true)}>Ask a question</Button>
      <AddQuestion
        visible={askQuestionModal}
        closeModal={() => setAskQuestionModal(false)}
        wallet={wallet}
      />
    </Fragment>
  );
};

export default Dashboard;
