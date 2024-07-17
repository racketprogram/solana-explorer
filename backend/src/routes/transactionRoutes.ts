import { Router } from 'express';
import { Connection } from '@solana/web3.js';

export default function(connection: Connection) {
  const router = Router();

  router.get('/:signature', async (req, res) => {
    try {
      const signature = req.params.signature;
      const transaction = await connection.getParsedTransaction(signature, {
        maxSupportedTransactionVersion: 0
      });

      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      const { meta, slot, blockTime } = transaction;

      const accountInputs = transaction.transaction.message.accountKeys.map((account, index) => {
        const preBalance = meta?.preBalances[index] ?? 0;
        const postBalance = meta?.postBalances[index] ?? 0;
        return {
          address: account.pubkey.toBase58(),
          change: postBalance - preBalance,
          postBalance: postBalance,
          details: [
            account.signer ? 'Signer' : '',
            account.writable ? 'Writable' : '',
            index === 0 ? 'Fee Payer' : ''
          ].filter(Boolean).join(', ')
        };
      });

      const transactionDetails = {
        signature,
        result: meta?.err ? 'Failed' : 'Success',
        timestamp: blockTime ? new Date(blockTime * 1000).toISOString() : null,
        confirmationStatus: 'Finalized', // Assuming finalized, adjust if needed
        slot,
        recentBlockhash: transaction.transaction.message.recentBlockhash,
        fee: meta?.fee ?? 0,
        computeUnitsConsumed: meta?.computeUnitsConsumed ?? 0,
        version: 'LEGACY', // Assuming legacy, adjust if needed
        accountInputs,
      };

      res.json(transactionDetails);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      res.status(500).json({ error: 'Failed to fetch transaction' });
    }
  });

  return router;
}