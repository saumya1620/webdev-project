# Project Collaboration Tool

## Features
- User registration & login with JWT authentication
- Role-based access control (Admin, Project Manager, TeamMember)
- Team creation and member management
- Project creation under teams
- Task management (create, assign, update status)

##  Tech Stack
- Node.js
- Express.js
- MongoDB 
- JWT for Authentication
- Bcrypt for Password Hashing
- Validator.js for Input Validation

## Installation

### Clone the repo:
   ```git clone https://github.com/saumya1620/webdev-project.git```
### Install dependencies:
```
cd webdev-project
npm install
```
### Create a .env file in the root with:
```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret
PORT=5000
```
### Run the project:
```
npm run dev

```

## API Endpoints

### Auth  
- `POST api/user/register` → Register new user
- `POST api/user/login` → Login user
- `GET api/user/info` → Get current logged-in user

### Teams  
- `POST api/teams/create` → Create new team
- `POST api/teams/:id/member` → Add members to a team

### Projects
- `POST api/projects` → Create new project
- `GET /projects/team/:teamId` → Get projects by team

### Tasks
- `POST api/tasks/create` → Create new task
- `PUT api/tasks/:taskId/assign` → Assign users to task
- `POST api/tasks/:taskId/status` → Update task status
- `GET api/tasks/project/:projectId` → Get all tasks for project

## Project Structure
```
webdev-project/
|── config/          # database.js for databse connection
│── controllers/     # Logic for auth, team, project, task
│── models/          # Mongoose schemas
│── routes/          # Express routes
│── middlewares/     # Auth and role check
│── utils/           # Helper functions
│── index.js         # App entry point
│── .env             # Environment variables
│── README.md        # Documentation
```
## Future Enhancements
- Add notifications for task assignment
- Implement real-time updates using Socket.io


