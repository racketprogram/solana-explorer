# Solana Blockchain Explorer

This project is a simple Solana blockchain explorer with a React frontend and Node.js backend.

## Features

- List recent blocks
- View block details
- View transaction details
- Search by block number or transaction signature

## Prerequisites

- Node.js (v14 or later)
- npm

## Project Structure
```
solana-explorer/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Setup and Running

### Backend

1. Install dependencies:
   
   ```cd backend && npm install```

2. Run for develop:

    ```cd backend && npm run dev```

    The application will be served from `http://localhost:3001`.


3. Run for production:

    ```cd backend && npm run start```

    The application will be available at `http://localhost:3001`.


### Frontend

1. Install dependencies:
   
   ```cd frontend && npm install```

2. Run for develop:

    ```cd frontend && npm run start```

    The application will be available at `http://localhost:3000`.

3. Build for production:

    ```cd backend && npm run build```


## API Endpoints

- GET `/api/blocks`: Fetch recent blocks
- GET `/api/blocks/:blockNumber`: Fetch details of a specific block
- GET `/api/transactions/:signature`: Fetch details of a specific transaction

## Environment Variables

- `SOLANA_RPC_URL`: Solana RPC URL (default: https://api.mainnet-beta.solana.com)
- `PORT`: Port for the backend server (default: 3001)

## Contributing

Contributions are welcome. Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).