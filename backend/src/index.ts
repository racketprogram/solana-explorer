import express from 'express';
import path from 'path';
import cors from 'cors';
import { Connection } from '@solana/web3.js';
import blockRoutes from './routes/blockRoutes';
import transactionRoutes from './routes/transactionRoutes';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

// 假设你的 Solana 连接设置
const connection = new Connection('https://api.mainnet-beta.solana.com');

// API 路由
app.use('/api/blocks', blockRoutes(connection));
app.use('/api/transactions', transactionRoutes(connection));

// 服务前端静态文件
app.use(express.static(path.join(__dirname, '../../frontend/build')));

// 所有其他GET请求返回前端的index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});