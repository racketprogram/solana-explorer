import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar: React.FC = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.length === 88) {
      console.log('Navigating to transaction:', search);
      navigate(`/tx/${search}`);
    } else {
      console.log('Navigating to block:', search);
      navigate(`/block/${search}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by block number or transaction signature"
        style={{ width: '100%', maxWidth: '500px' }}
      />
      <button type="submit">Search</button>
    </form>
  );
};