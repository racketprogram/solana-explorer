import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface AccountInput {
  address: string;
  change: number;
  postBalance: number;
  details: string;
}

interface TransactionDetails {
  signature: string;
  result: string;
  timestamp: string | null;
  confirmationStatus: string;
  slot: number;
  recentBlockhash: string;
  fee: number;
  computeUnitsConsumed: number;
  version: string;
  accountInputs: AccountInput[];
}

export const TransactionDetails: React.FC = () => {
  const { signature } = useParams<{ signature: string }>();
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      const response = await axios.get(`http://localhost:3001/api/transactions/${signature}`);
      setTransaction(response.data);
    };
    fetchTransaction();
  }, [signature]);

  if (!transaction) return <div>Loading...</div>;

  return (
    <div>
      <h1>Transaction Details</h1>
      <p>Signature: {transaction.signature}</p>
      <p>Result: {transaction.result}</p>
      <p>Timestamp: {transaction.timestamp}</p>
      <p>Confirmation Status: {transaction.confirmationStatus}</p>
      <p>Slot: {transaction.slot}</p>
      <p>Recent Blockhash: {transaction.recentBlockhash}</p>
      <p>Fee: {transaction.fee / 1e9} SOL</p>
      <p>Compute Units Consumed: {transaction.computeUnitsConsumed}</p>
      <p>Transaction Version: {transaction.version}</p>

      <h2>Account Inputs</h2>
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Change (SOL)</th>
            <th>Post Balance (SOL)</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {transaction.accountInputs.map((account, index) => (
            <tr key={index}>
              <td>{account.address}</td>
              <td>{account.change / 1e9}</td>
              <td>{account.postBalance / 1e9}</td>
              <td>{account.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};