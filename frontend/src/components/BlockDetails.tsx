import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Transaction {
  signature: string;
  success: boolean;
}

interface BlockDetails {
  blockhash: string;
  slot: number;
  parentSlot: number;
  timestamp: string | null;
  transactions: Transaction[];
  previousBlockhash: string;
  rewards: Array<{
    pubkey: string;
    lamports: number;
    postBalance: number;
    rewardType: string;
  }>;
  blockHeight: number | null;
  blockLeader: string | null;
  epoch: number;
}

export const BlockDetails: React.FC = () => {
  const { blockNumber } = useParams<{ blockNumber: string }>();
  const [block, setBlock] = useState<BlockDetails | null>(null);

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
      <h1>Block Details</h1>
      <p>Blockhash: {block.blockhash}</p>
      <p>Slot: {block.slot}</p>
      <p>Parent Slot: {block.parentSlot}</p>
      <p>Timestamp: {block.timestamp}</p>
      <p>Previous Blockhash: {block.previousBlockhash}</p>
      <p>Block Height: {block.blockHeight}</p>
      <p>Block Leader: {block.blockLeader}</p>
      <p>Epoch: {block.epoch}</p>
      
      <h2>Transactions</h2>
      <ul>
        {block.transactions.map((tx, index) => (
          <li key={index}>
            <Link to={`/tx/${tx.signature}`}>
              {tx.signature} - {tx.success ? 'Success' : 'Failed'}
            </Link>
          </li>
        ))}
      </ul>

      <h2>Rewards</h2>
      <ul>
        {block.rewards.map((reward, index) => (
          <li key={index}>
            Pubkey: {reward.pubkey}, Amount: {reward.lamports / 1e9} SOL, Type: {reward.rewardType}
          </li>
        ))}
      </ul>
    </div>
  );
};