
# React Vehicle Simulation Application

This is an Express + React.js application for creating, displaying, updating, and deleting scenarios and vehicles. The application allows users to simulate vehicle movement within a scenario based on predefined parameters. It utilizes a Node.js server for handling GET, PUT, POST, and DELETE requests and stores data in a JSON file.

## Features

- Create, display, update, and delete scenarios and vehicles.  
- Simulate vehicle movement within a scenario.  
- Proper validation to ensure vehicles' positions are within the graph container size.  
- Sidebar navigation for easy access to different sections of the application.

## Installation

### Frontend  
1. Navigate to the frontend folder.  
2. setup using `pnpm i`, for dependencies  
3. Build files using `pnpm run build`  
4. Start the development server using `pnpm run dev`  

### Backend  
1. Clone the repository.  
2. Navigate to the backend folder.  
3. Run `pnpm i` to install all dependencies.  
4. Run `pnpm run build` to build the project.  
5. Run `pnpm run start` to start the server.

**NOTE**: Frontend files should be built before building and running backend files, as they are needed by Express to serve as static files.
