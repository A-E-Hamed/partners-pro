# Partners-Pro

This project contains both the frontend and backend for the Partners-Pro application.

## Prerequisites

Ensure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)
- A package manager (`npm`)
- [MongoDB](https://www.mongodb.com/) (if using locally)

## Installation & Setup

### 1. Clone the Repository


git clone https://github.com/A-E-Hamed/partners-pro.git
cd partners-pro
# partners-pro

### 2. Install Dependencies
- Backend Setup
   - cd backend
   - npm install
- Frontend Setup
   - cd ../frontend
   - npm install

### 3. Running the Project
- Start the Backend Server
    - cd backend
    - node app.js
    
- Start the Frontend Application
    - cd frontend
    - npm run dev
 
### 4. API Endpoints
  - POST /api/users/register → Register a new user
  - POST /api/users/login → Log in a user
  - GET /api/users/profile → Fetch user profile (Requires authentication)
