import { Router } from 'express';
import { Connection, VersionedBlockResponse } from '@solana/web3.js';

interface TransactionResponse {
  transaction: { signatures: string[] };
  meta?: { err: any } | null;
}

interface BlockDetails {
  blockhash: string;
  slot: number;
  parentSlot: number;
  timestamp: string | null;
  transactions: { signature: string; success: boolean }[];
  previousBlockhash: string;
  rewards: VersionedBlockResponse['rewards'];
  blockHeight: number;
  blockLeader: string | null;
  epoch: number;
}

export default function(connection: Connection) {
  const router = Router();

  router.get('/', async (req, res) => {
    try {
      const { lastValidBlockHeight } = await connection.getLatestBlockhash();
      const blocks = await connection.getBlocks(lastValidBlockHeight - 10, lastValidBlockHeight);
      res.json(blocks);
    } catch (error) {
      console.error('Error fetching blocks:', error);
      res.status(500).json({ error: 'Failed to fetch blocks' });
    }
  });

  router.get('/:blockNumber', async (req, res) => {
    try {
      const blockNumber = parseInt(req.params.blockNumber);
      const [block, epochInfo] = await Promise.all([
        connection.getBlock(blockNumber, { maxSupportedTransactionVersion: 0 }),
        connection.getEpochInfo()
      ]);

      if (!block) {
        return res.status(404).json({ error: 'Block not found' });
      }

      const blockDetails: BlockDetails = {
        blockhash: block.blockhash,
        slot: blockNumber,
        parentSlot: block.parentSlot,
        timestamp: block.blockTime ? new Date(block.blockTime * 1000).toISOString() : null,
        transactions: (block.transactions as TransactionResponse[]).map(tx => ({
          signature: tx.transaction.signatures[0],
          success: tx.meta?.err === null
        })),
        previousBlockhash: block.previousBlockhash,
        rewards: block.rewards || [],
        blockHeight: blockNumber,
        blockLeader: block.rewards?.find(reward => reward.rewardType === 'Fee')?.pubkey ?? null,
        epoch: epochInfo.epoch
      };

      res.json(blockDetails);
    } catch (error) {
      console.error('Error fetching block:', error);
      res.status(500).json({ error: 'Failed to fetch block' });
    }
  });

  return router;
}