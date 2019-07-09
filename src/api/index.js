import arweave from './arweaveSetup';
import { currentUnixTime, getAppName } from './utils';
import uuid from 'uuid/v1';

export const getWalletAddress = async wallet =>
  arweave.wallets.jwkToAddress(wallet);

export const addQuestion = async (questionText, wallet) => {
  const questionId = uuid();

  const transaction = await arweave.createTransaction(
    { data: JSON.stringify({ questionText, questionId }) },
    wallet
  );

  transaction.addTag('Question-Text', questionText);
  transaction.addTag('questionId', questionId);
  transaction.addTag('Time', currentUnixTime());
  transaction.addTag('App-Name', getAppName());

  await arweave.transactions.sign(transaction, wallet);
  await arweave.transactions.post(transaction);
  return;
};

export const getAllQuestions = async () => {
  const query = {
    op: 'equals',
    expr1: 'App-Name',
    expr2: getAppName()
  };

  const txids = await arweave.arql(query);

  const transactions = await Promise.all(
    txids.map(txid => arweave.transactions.get(txid))
  );

  const stringifiedTransactions = await Promise.all(
    transactions.map(transaction =>
      transaction.get('data', { decode: true, string: true })
    )
  );

  return stringifiedTransactions.map(transaction => JSON.parse(transaction));
};
