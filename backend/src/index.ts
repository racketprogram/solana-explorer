import express from 'express';
import cors from 'cors';
import { Connection } from '@solana/web3.js';

import blockRoutes from './routes/blockRoutes';
import transactionRoutes from './routes/transactionRoutes';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const connection = new Connection('https://api.mainnet-beta.solana.com');

app.use('/api/blocks', blockRoutes(connection));
app.use('/api/transactions', transactionRoutes(connection));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
