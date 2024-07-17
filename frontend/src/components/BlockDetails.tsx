import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Transaction {
  transaction: {
    signatures: string[]
  }
}

interface Block {
  transactions: Transaction[]
  // Add other properties as needed
}

export const BlockDetails: React.FC = () => {
  const { blockNumber } = useParams<{ blockNumber: string }>();
  const [block, setBlock] = useState<Block | null>(null);

  useEffect(() => {
    const fetchBlock = async () => {
      const response = await axios.get(`http://localhost:3001/api/blocks/${blockNumber}`);
      setBlock(response.data);
    };
    fetchBlock();
  }, [blockNumber]);

  if (!block) return <div>Loading...</div>;

  return (
    <div>
      <h1>Block {blockNumber}</h1>
      <h2>Transactions</h2>
      <ul>
        {block.transactions.map((tx: Transaction) => (
          <li key={tx.transaction.signatures[0]}>
            <Link to={`/tx/${tx.transaction.signatures[0]}`}>{tx.transaction.signatures[0]}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};