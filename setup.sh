#!/bin/bash

# Final Tour Migration Script
# Migrates from Drizzle to Prisma and separates backend/frontend

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check if we're in a git repository (optional)
    if [ -d ".git" ]; then
        print_success "Git repository detected"
    else
        print_warning "Not in a git repository. Consider initializing git for version control."
    fi
    
    # Check for Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    # Check for npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    print_success "Prerequisites check passed"
}

# Create backup of current structure
backup_current_structure() {
    print_status "Creating backup of current structure..."
    
    BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    
    # Copy current structure to backup
    for item in *; do
        if [ "$item" != "$BACKUP_DIR" ] && [ "$item" != "migrate-to-separated-structure.sh" ]; then
            cp -r "$item" "$BACKUP_DIR/" 2>/dev/null || true
        fi
    done
    
    print_success "Backup created in $BACKUP_DIR"
}

# Create new directory structure
create_directory_structure() {
    print_status "Creating new directory structure..."
    
    mkdir -p backend/{src,prisma,scripts}
    mkdir -p backend/src/{routes,middleware,lib,types,controllers}
    mkdir -p frontend/{src,public}
    mkdir -p frontend/src/{components,pages,hooks,lib,types,styles}
    
    print_success "Directory structure created"
}

# Move server files
move_server_files() {
    print_status "Moving server files..."
    
    if [ -d "server" ]; then
        # Move server source files
        if [ -d "server/src" ]; then
            cp -r server/src/* backend/src/ 2>/dev/null || true
        else
            cp -r server/* backend/src/ 2>/dev/null || true
        fi
        print_success "Server files moved to backend/src/"
    else
        print_warning "No server directory found"
    fi
}

# Move client files
move_client_files() {
    print_status "Moving client files..."
    
    if [ -d "client" ]; then
        # Move client source files
        if [ -d "client/src" ]; then
            cp -r client/src/* frontend/src/ 2>/dev/null || true
        fi
        
        # Move public files
        if [ -d "client/public" ]; then
            cp -r client/public/* frontend/public/ 2>/dev/null || true
        fi
        
        # Move client config files
        [ -f "client/vite.config.ts" ] && cp client/vite.config.ts frontend/
        [ -f "client/tailwind.config.ts" ] && cp client/tailwind.config.ts frontend/
        [ -f "client/postcss.config.js" ] && cp client/postcss.config.js frontend/
        [ -f "client/index.html" ] && cp client/index.html frontend/
        
        print_success "Client files moved to frontend/"
    else
        print_warning "No client directory found"
    fi
}

# Move shared files
move_shared_files() {
    print_status "Moving shared files..."
    
    if [ -d "shared" ]; then
        # Copy shared files to both backend and frontend
        cp -r shared backend/src/ 2>/dev/null || true
        cp -r shared frontend/src/ 2>/dev/null || true
        print_success "Shared files copied to both backend and frontend"
    else
        print_warning "No shared directory found"
    fi
}

# Move configuration files
move_config_files() {
    print_status "Moving configuration files..."
    
    # Move Docker files
    [ -f "Dockerfile" ] && mv Dockerfile backend/
    [ -f "docker-compose.yml" ] && cp docker-compose.yml docker-compose.yml.backup
    
    # Move database init files
    if [ -d "init-db" ]; then
        cp -r init-db/* backend/scripts/ 2>/dev/null || true
        print_success "Database init files moved to backend/scripts/"
    fi
}

# Create package.json files
create_package_json_files() {
    print_status "Creating package.json files..."
    
    # Backend package.json
    cat > backend/package.json << 'EOF'
{
  "name": "final-tour-backend",
  "version": "1.0.0",
  "description": "Final Tour Backend API",
  "main": "dist/index.js",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:seed": "tsx src/seed.ts"
  },
  "dependencies": {
    "@prisma/client": "^5.7.1",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/node": "^20.10.5",
    "prisma": "^5.7.1",
    "tsx": "^4.6.2",
    "typescript": "^5.3.3"
  }
}
EOF

    # Frontend package.json
    cat > frontend/package.json << 'EOF'
{
  "name": "final-tour-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.1",
    "axios": "^1.6.2",
    "@tanstack/react-query": "^5.17.0",
    "react-hook-form": "^7.48.2",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
EOF

    print_success "Package.json files created"
}

# Create TypeScript configurations
create_typescript_configs() {
    print_status "Creating TypeScript configurations..."
    
    # Backend tsconfig.json
    cat > backend/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

    # Frontend tsconfig.json
    cat > frontend/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

    # Frontend tsconfig.node.json
    cat > frontend/tsconfig.node.json << 'EOF'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOF

    print_success "TypeScript configurations created"
}

# Create Prisma schema
create_prisma_schema() {
    print_status "Creating Prisma schema..."
    
    cat > backend/prisma/schema.prisma << 'EOF'
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Add your user relations here
  tours     Tour[]
  
  @@map("users")
}

model Tour {
  id          String   @id @default(cuid())
  title       String
  description String?
  price       Float
  duration    Int      // in days
  maxGroupSize Int
  difficulty  String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  @@map("tours")
}

// Add more models as needed based on your current Drizzle schema
EOF

    print_success "Prisma schema created (customize based on your current models)"
}

# Create environment files
create_env_files() {
    print_status "Creating environment files..."
    
    # Backend .env.example
    cat > backend/.env.example << 'EOF'
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/final_tour"

# Server
PORT=3001
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key

# Other environment variables as needed
EOF

    # Frontend .env.example
    cat > frontend/.env.example << 'EOF'
# API URL
VITE_API_URL=http://localhost:3001

# Other frontend environment variables
EOF

    # Copy to actual .env files
    cp backend/.env.example backend/.env
    cp frontend/.env.example frontend/.env
    
    print_success "Environment files created"
}

# Create basic server structure
create_basic_server() {
    print_status "Creating basic server structure..."
    
    # Database client
    cat > backend/src/lib/db.ts << 'EOF'
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
EOF

    # Main server file
    cat > backend/src/index.ts << 'EOF'
import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import { prisma } from "./lib/db"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
)
app.use(express.json())

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// API Routes
app.get("/api/tours", async (req, res) => {
  try {
    const tours = await prisma.tour.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })
    res.json(tours)
  } catch (error) {
    console.error("Error fetching tours:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.post("/api/tours", async (req, res) => {
  try {
    const { title, description, price, duration, maxGroupSize, difficulty, userId } = req.body

    const tour = await prisma.tour.create({
      data: {
        title,
        description,
        price,
        duration,
        maxGroupSize,
        difficulty,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    res.status(201).json(tour)
  } catch (error) {
    console.error("Error creating tour:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`)
})

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect()
  process.exit(0)
})
EOF

    print_success "Basic server structure created"
}

# Create frontend basic structure
create_frontend_structure() {
    print_status "Creating frontend structure..."
    
    # Vite config
    cat > frontend/vite.config.ts << 'EOF'
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
})
EOF

    # API client
    cat > frontend/src/lib/api.ts << 'EOF'
import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001"

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)
EOF

    # Basic App component
    cat > frontend/src/App.tsx << 'EOF'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-semibold">Final Tour</h1>
                </div>
              </div>
            </div>
          </header>
          
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Welcome to Final Tour
                  </h2>
                  <p className="text-gray-600">
                    Your application has been successfully migrated!
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
EOF

    # Main entry point
    cat > frontend/src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

    # Basic CSS
    cat > frontend/src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
EOF

    # HTML template
    cat > frontend/index.html << 'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Final Tour</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

    print_success "Frontend structure created"
}

# Create Docker files
create_docker_files() {
    print_status "Creating Docker files..."
    
    # Backend Dockerfile
    cat > backend/Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Build the application
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
EOF

    # Frontend Dockerfile
    cat > frontend/Dockerfile << 'EOF'
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration (create a basic one)
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
EOF

    # Docker Compose
    cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: final_tour
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: postgresql://postgres:password@postgres:5432/final_tour
      NODE_ENV: development
      FRONTEND_URL: http://localhost:5173
    depends_on:
      - postgres
    volumes:
      - ./backend:/app
      - /app/node_modules

  frontend:
    build: ./frontend
    ports:
      - "5173:80"
    environment:
      VITE_API_URL: http://localhost:3001
    depends_on:
      - backend

volumes:
  postgres_data:
EOF

    print_success "Docker files created"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install backend dependencies
    print_status "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    print_success "Backend dependencies installed"
    
    # Install frontend dependencies
    print_status "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    print_success "Frontend dependencies installed"
}

# Setup Prisma
setup_prisma() {
    print_status "Setting up Prisma..."
    
    cd backend
    npx prisma generate
    print_success "Prisma client generated"
    
    print_warning "Remember to run 'npx prisma db push' after setting up your database URL"
    cd ..
}

# Create README files
create_readme_files() {
    print_status "Creating README files..."
    
    # Main README
    cat > README.md << 'EOF'

