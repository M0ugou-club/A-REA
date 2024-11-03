# Technical Documentation

---

# Build Project:

## Requirements:
- Docker
- Docker Compose

## How to Build and Run:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/M0ugou-club/A-REA

2. **Env Variables:**

- To Create your Env Variables, check [Back](./Back-end) Documentation

3. **Build and Start the Containers:**
   ```bash
    docker-compose up --build

4. **Access the Application:**

- Back-End : Accessible at http://localhost:8080/ for a local host
- Front-End : Accessible at http://localhost:8081/ for a local host

5. **Stop the Services:**
   ```bash
   docker-compose down


# Architecture Documentation

## Overview
This section provides an overview of the application architecture, detailing each component and the interactions within the system. The architecture is designed to ensure modularity, scalability, and clear separation of concerns between the frontend, backend, mobile application, and database.

### Components
1. **Frontend (Angular)**
   - **Description:** The web client built with Angular serves as the user interface for desktop users, allowing them to interact with the application’s features.
   - **Responsibilities:**
      - Provides a responsive and interactive UI.
      - Communicates with the backend via API calls.
      - Manages client-side state for a seamless user experience.
   - **Communication:** Communicates with the backend server using RESTful API calls over HTTP.

2. **Backend (Node.js with Express)**
   - **Description:** The backend, developed with Node.js and Express, serves as the core of the application, handling all business logic, data processing, and API endpoints.
   - **Responsibilities:**
      - Manages authentication, service integrations, and application logic.
      - Interfaces with the database for data storage and retrieval.
   - **Communication:**
      - Handles incoming requests from the frontend and mobile applications.
      - Communicates with MongoDB for persistent data storage.

3. **Database (MongoDB)**
   - **Description:** MongoDB serves as the database layer, providing a NoSQL document store to manage application data efficiently.
   - **Responsibilities:**
      - Stores user data, configuration settings, and any other persistent information required by the application.
      - Facilitates quick data retrieval and easy scaling as the application grows.
   - **Communication:**
      - Connected to the backend server, enabling data access for both the web and mobile applications.

4. **Mobile Application (React Native with Expo)**
   - **Description:** The mobile application, built with React Native and Expo, offers a mobile-friendly interface, allowing users to access the application’s features on the go.
   - **Responsibilities:**
      - Provides a streamlined UI optimized for mobile devices.
      - Enables users to perform the same actions as the web version in a mobile format.
   - **Communication:** Similar to the frontend, it connects with the backend via RESTful API calls over HTTPS.

### Data Flow

1. **User Requests:**
   - Both the web and mobile clients send requests to the backend to perform various actions, such as logging in, fetching data, or performing a specific action.

2. **Backend Processing:**
   - The backend processes these requests, applies the necessary business logic, and interacts with the database as needed.

3. **Database Access:**
   - For data persistence and retrieval, the backend communicates with MongoDB, managing CRUD operations in the database.

4. **Response to Client:**
   - Once the backend completes processing, it sends a response back to the web or mobile client, updating the user interface accordingly.

---

## Summary
This architecture is designed to ensure that each part of the application is modular, enabling easy updates, scalability, and efficient communication across components. By separating concerns between frontend, backend, and mobile, the system supports both web and mobile platforms, providing a cohesive user experience across devices.


# API Documentation:

- go [Here](http://inox-qcb.fr:8080/api-docs) to have all our API Documentation

# Code documentation :

- For [Back-end](./Back-end.md)

- For [Front-end](./Front-end.md)

- For [Mobile](./Mobile.md)
