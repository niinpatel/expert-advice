import arweave from './arweaveSetup';
import { currentUnixTime, getAppName } from './utils';
import uuid from 'uuid/v1';

export const getWalletAddress = async wallet =>
  arweave.wallets.jwkToAddress(wallet);

export const addQuestion = async (questionText, wallet) => {
  const questionId = uuid();
  const time = currentUnixTime();

  const transaction = await arweave.createTransaction(
    {
      data: JSON.stringify({
        questionText,
        questionId,
        time
      })
    },
    wallet
  );

  transaction.addTag('Content-Type', 'Question');
  transaction.addTag('Question-Text', questionText);
  transaction.addTag('Question-Id', questionId);
  transaction.addTag('Time', time);
  transaction.addTag('App-Name', getAppName());

  await arweave.transactions.sign(transaction, wallet);
  await arweave.transactions.post(transaction);
  return;
};

export const answerQuestion = async (
  { name, credential, answer, questionId },
  wallet
) => {
  const time = currentUnixTime();

  const transaction = await arweave.createTransaction(
    {
      data: JSON.stringify({ name, credential, answer })
    },
    wallet
  );

  transaction.addTag('Content-Type', 'Answer');
  transaction.addTag('Question-Id', questionId);
  transaction.addTag('Time', time);
  transaction.addTag('App-Name', getAppName());

  await arweave.transactions.sign(transaction, wallet);
  await arweave.transactions.post(transaction);
  return;
};

export const getAllQuestions = async () => {
  const query = {
    op: 'and',
    expr1: {
      op: 'equals',
      expr1: 'App-Name',
      expr2: getAppName()
    },
    expr2: {
      op: 'equals',
      expr1: 'Content-Type',
      expr2: 'Question'
    }
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

export const getAnswers = async ({ questionId }) => {
  const query = {
    op: 'and',
    expr1: {
      op: 'equals',
      expr1: 'Question-Id',
      expr2: questionId
    },
    expr2: {
      op: 'and',
      expr1: {
        op: 'equals',
        expr1: 'Content-Type',
        expr2: 'Answer'
      },
      expr2: {
        op: 'equals',
        expr1: 'App-Name',
        expr2: getAppName()
      }
    }
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
