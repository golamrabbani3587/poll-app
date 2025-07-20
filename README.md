Flash pool

This repository contains two applications:

* **Next.js App** (frontend) running on port **3000**
* **Express.js App** (backend) running on port **3001**

## Prerequisites

* Node.js v14+ and npm installed
* Git

## Project Structure

```
project-root/
├── next-app/       # Next.js frontend
├── express-app/    # Express.js backend
└── README.md       # This file
```

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. **Install dependencies**

```bash
# Frontend
cd next-app
npm install

# Backend
cd ../express-app
npm install
```

## Environment Variables

### Frontend (`next-app/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (`express-app/.env`)

```env
PORT=3001
# Add other variables here...
```

## Running Applications

### Start Express.js (Backend)

```bash
cd express-app
npm run dev
```

The server will start on [http://localhost:3001](http://localhost:3001).

### Start Next.js (Frontend)

```bash
cd next-app
npm run dev
```

The development server will start on [http://localhost:3000](http://localhost:3000).

## Build for Production

### Backend

```bash
cd express-app
npm run build   # if using Babel/TypeScript; otherwise skip
npm start
```

### Frontend

```bash
cd next-app
npm run build
npm run start
```

## Scripts

#### Next.js (`next-app/package.json`)

* `dev`: Starts the development server on port 3000
* `build`: Builds the production application
* `start`: Runs the production build

#### Express.js (`express-app/package.json`)

* `dev`: Starts the server with nodemon (port 3001)
* `start`: Runs the server (port 3001)
* `build`: Builds the project (if applicable)

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/...`)
3. Commit your changes (`git commit -m 'feat: ...'`)
4. Push to the branch (`git push origin feature/...`)
5. Open a Pull Request

## License

MIT © Your Name
