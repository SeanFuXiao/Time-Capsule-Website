# Time-Capsule-Website

![Time Capsule](https://p.turbosquid.com/ts-thumb/Ty/NVrYE0/ap/timecapsulevray3dmodel001/jpg/1663600610/600x600/fit_q87/66021f0549e17b7941f458b87859d7ee105823fa/timecapsulevray3dmodel001.jpg)

### Overview

The **Digital Time Capsule App** allows users to create, manage, and share digital time capsules that store messages or content which can only be accessed after a specified unlock date. It creates a unique experience for users by enabling them to send messages into the future, either for themselves or others.

#### Key Features:

- **User Registration and Login**: Secure authentication using bcrypt and session management.
- **Create Time Capsules**: Users can create a capsule with a title, content, and an unlock date.
- **Invite Participants**: Capsule owners can invite other users to view and contribute to the capsule once it’s unlocked.
- **View Capsules**: Capsules remain locked until the unlock date, after which participants can view the stored content.
- **Manage Participants**: Capsule owners can add or remove participants.
- **Comment System**: After the capsule is unlocked, users can leave comments.

#### Technologies Used:

- **Node.js**: For handling backend processes.
- **Express.js**: Framework for building web applications and handling routes.
- **MongoDB**: NoSQL database for storing users, capsules, and comments.
- **Mongoose**: For defining schemas and interacting with MongoDB.
- **bcrypt.js**: For password encryption.
- **express-session**: For handling user sessions.
- **dotenv**: For managing environment variables securely.

### Route Table

| URL                                        | REST Route         | HTTP Verb | CRUD Action | EJS View(s)         | Description                                       |
| ------------------------------------------ | ------------------ | --------- | ----------- | ------------------- | ------------------------------------------------- |
| `/register`                                | register           | GET       | read        | `register.ejs`      | Displays the registration form.                   |
| `/register`                                | register           | POST      | create      | -                   | Handles user registration.                        |
| `/login`                                   | login              | GET       | read        | `login.ejs`         | Displays the login form.                          |
| `/login`                                   | login              | POST      | create      | -                   | Handles user login and session creation.          |
| `/dashboard`                               | dashboard          | GET       | read        | `dashboard.ejs`     | Displays the user dashboard with capsule details. |
| `/logout`                                  | logout             | GET       | delete      | -                   | Logs out the user and destroys the session.       |
| `/capsules/create`                         | new                | GET       | read        | `createCapsule.ejs` | Displays the form to create a new capsule.        |
| `/capsules/create`                         | create             | POST      | create      | -                   | Handles the creation of a new capsule.            |
| `/capsules/:id`                            | show               | GET       | read        | `viewCapsule.ejs`   | Displays details for a specific capsule.          |
| `/capsules/:id/edit`                       | edit               | GET       | read        | `editCapsule.ejs`   | Displays the form to edit a capsule.              |
| `/capsules/:id/edit`                       | update             | POST      | update      | -                   | Handles updates to a capsule.                     |
| `/capsules/:id/delete`                     | delete             | POST      | delete      | -                   | Handles the deletion of a specific capsule.       |
| `/capsules/:id/invite`                     | invite             | POST      | update      | -                   | Invites a participant to a capsule.               |
| `/capsules/:id/comments`                   | comment            | POST      | create      | -                   | Adds a comment to a capsule.                      |
| `/capsules/:id/deleteSelectedParticipants` | deleteParticipants | POST      | delete      | -                   | Deletes selected participants from a capsule.     |

### Git Repository

You can find the code for this project in the following GitHub repository:

- [GitHub Repository](https://github.com/SeanFuXiao/Time-Capsule-Website.git)

### Heroku Deployment

The project is deployed and live on Heroku. You can access the application at the following link:

- [Live Application on Heroku](https://timecapsules-a1c79a7af496.herokuapp.com/)
