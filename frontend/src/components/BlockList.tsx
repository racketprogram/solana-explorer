import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const BlockList: React.FC = () => {
  const [blocks, setBlocks] = useState<number[]>([]);

  useEffect(() => {
    const fetchBlocks = async () => {
      const response = await axios.get('http://localhost:3001/api/blocks');
      setBlocks(response.data);
    };
    fetchBlocks();
  }, []);

  return (
    <div>
      <h1>Latest Blocks</h1>
      <ul>
        {blocks.map((block: number) => (
          <li key={block}>
            <Link to={`/block/${block}`}>Block {block}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};