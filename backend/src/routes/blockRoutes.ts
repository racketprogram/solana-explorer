import { Router } from 'express';
import { Connection, GetVersionedBlockConfig } from '@solana/web3.js';

export default function(connection: Connection) {
  const router = Router();

  router.get('/', async (req, res) => {
    try {
      const currentSlot = await connection.getSlot();
      const blocks = await connection.getBlocks(currentSlot - 10, currentSlot);
      res.json(blocks);
    } catch (error) {
      console.error('Error fetching blocks:', error);
      res.status(500).json({ error: 'Failed to fetch blocks' });
    }
  });

  router.get('/:blockNumber', async (req, res) => {
    try {
      const config: GetVersionedBlockConfig = {
        maxSupportedTransactionVersion: 0
      };
      const block = await connection.getBlock(parseInt(req.params.blockNumber), config);
      res.json(block);
    } catch (error) {
      console.error('Error fetching block:', error);
      res.status(500).json({ error: 'Failed to fetch block' });
    }
  });

  return router;
}