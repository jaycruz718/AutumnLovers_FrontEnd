## Autumn's Lovers
This is a website created for those who love this time of the year, Autumn and all the beautiful holidays that follow. It is a full-stack social web application built with React (Vite) on the frontend and Express/MongoDB on the backend.
Users can register, log in, and share posts about their favorite autumn moments, events, and activities.

## BackEnd Link: https://github.com/jaycruz718/AutumnLovers_BackEnd

### Features
- User Authentication: Sign up and log in securely using JWT tokens.
- Create Posts: Users can create, edit, and view their own posts
- Profile pages: Personalized space for users to see and manage their posts.
- Thematic Design: A cozy autumn-inspired user interface
- Comments & Likes: You can leave comments and likes for your favorite posts.
- Events Section: Community events related to the season
- Full REST API built with Express and MongoDB

### Tech Stack
Frontend
- React (Vite)
- React Router DOM
- Axios
- CSS (custom styling)

Backend
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt.js (for password hashing)
- dotenv & cors
- Nodemon (for dev)

### Project Structure
Autumn-Lovers/
├── client/                # Frontend (Vite + React)
│   ├── src/
│   │   ├── components/    # Reusable UI components (NavBar, PostForm, etc.)
│   │   ├── context/       # AuthContext for global auth state
│   │   ├── pages/         # Page components (Profile, Login, Events)
│   │   ├── assets/        # Images and videos
│   │   └── api/           # Axios API helpers
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Backend (Express)
│   ├── routes/            # Express routes (user, posts, comments, events)
│   ├── models/            # Mongoose schemas
│   ├── middleware/        # Custom middleware (auth, logger, error handler)
│   ├── db/                # Database connection
│   ├── server.js          # Express app entry point
│   └── .env
│
└── README.md

### API Endpoints

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| `POST` | `/api/user/register` | Register a new user |
| `POST` | `/api/user/login`    | Log in a user       |
| `GET`  | `/api/post`          | Get all posts       |
| `POST` | `/api/post`          | Create a new post   |
| `GET`  | `/api/events`        | Get all events      |


### Environment Variables
| Variable     | Description                |
| ------------ | -------------------------- |
| `MONGO_URI`  | MongoDB connection string  |
| `JWT_SECRET` | Secret key for JWT signing |
| `PORT`       | Backend server port        |

### Future Improvements
- Support image and video loading in posts
- Dark / light theme toggle
- Mobile-friendly design
- Shops Page (a part of the app that will connect people with local stores and businesses offering Halloween/Autumn services like cakes for parties.)

### Author
Autumn Lovers was created by Jennifer Cruz Gaston
***A cozy space for autumn enthusiasts to share their favorite moments***

- Contact: jaycruz718@gmail.com
- GitHub: https://github.com/jaycruz718

### Sources
- https://pixabay.com
- https://wallpaper.com
- google.com

