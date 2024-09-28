# MERN-HemEstate

**MERN-HemEstate** is a real-estate marketplace web application developed using the **MERN stack**. The platform allows users to buy and sell properties such as villas, homes, and mansions. It includes user authentication, image storage with Firebase, and state management using Redux.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)


## Features

- User registration and authentication
- OAuth and JWT for secure login
- Upload and manage property images via Firebase
- Search and filter properties by location and price
- Responsive design optimized for mobile and desktop
- Integrated with Redux for state management
- Real-time notifications for property updates

## Technologies Used

- **MongoDB**: NoSQL database for storing property and user data
- **Express**: Backend framework for building the REST API
- **React**: Frontend JavaScript library for building the user interface
- **Node.js**: JavaScript runtime for the backend
- **Firebase**: Cloud storage for property images
- **Redux**: State management across the application
- **JWT & OAuth**: For authentication and authorization

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/sandyhem/MERN-HemEstate.git
    ```

2. Navigate to the project directory:

    ```bash
    cd MERN-HemEstate
    ```

3. Install server and client dependencies:

    ```bash
    npm install
    cd client
    npm install
    ```

4. Add environment variables for Firebase API credentials and database configuration in a `.env` file:

    ```env
    MONGO_URI=your_mongodb_connection_string
    FIREBASE_API_KEY=your_firebase_api_key
    FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    FIREBASE_PROJECT_ID=your_firebase_project_id
    FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    FIREBASE_APP_ID=your_firebase_app_id
    JWT_SECRET=your_jwt_secret
    ```

5. Start both the client and the server:

    ```bash
    cd ..
    npm run dev
    ```

The application should now be running on `http://localhost:3000`.

## Usage

1. Browse available properties on the homepage.
2. Create an account or log in to list your property for sale.
3. Upload property details, including images and price.
4. Use the search and filter options to find properties by location, type, or price.
5. View property details, including contact information of the seller.

## Contributing

If you would like to contribute to this project, feel free to fork the repository, create a new branch, and submit a pull request. Contributions to improve features or fix bugs are welcome.

