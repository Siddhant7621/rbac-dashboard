# rbac-dashboard
Role-Based Access Control Dashboard Project


## Setup and Installation

**Prerequisites:**
-   Node.js (v14 or higher)
-   npm or yarn
-   MongoDB installed and running locally, or a MongoDB Atlas connection string.

**Steps:**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/rbac-dashboard.git
    cd rbac-dashboard
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install # or yarn
    ```

3.  **Configure Backend Environment Variables:**
    Create a `.env` file in the `backend/` directory based on `backend/.env.example`:
    ```
    PORT=5001
    MONGO_URI=mongodb://localhost:27017/rbac_dashboard
    JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
    ```
    *Replace `your_super_secret_jwt_key_here_make_it_long_and_random` with a strong, random string.*

4.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend
    npm install # or yarn
    ```

5.  **Configure Frontend Environment Variables:**
    Create a `.env.local` file in the `frontend/` directory based on `frontend/.env.local.example`:
    ```
    NEXT_PUBLIC_API_BASE_URL=http://localhost:5001
    ```
    *Ensure this matches your backend's `PORT`.*

6.  **Run the Applications:**
    You can run both the frontend and backend concurrently.
    First, ensure you are in the root `rbac-dashboard` directory.

    **Option 1: Using `npm concurrently` (Recommended for development)**
    Install `concurrently` globally or as a dev dependency in the root `package.json`:
    ```bash
    npm install -g concurrently # or npm install concurrently --save-dev
    ```
    Add a script to your root `package.json` (if you haven't already):
    ```json
    // rbac-dashboard/package.json
    {
      "name": "rbac-dashboard-root",
      "version": "1.0.0",
      "description": "Root package for RBAC Dashboard",
      "main": "index.js",
      "scripts": {
        "start": "concurrently \"npm run start --prefix backend\" \"npm run dev --prefix frontend\""
      },
      "devDependencies": {
        "concurrently": "^8.2.2"
      }
    }
    ```
    Then, from the root directory:
    ```bash
    npm start
    ```

    **Option 2: Running separately**
    In one terminal, start the backend:
    ```bash
    cd backend
    npm start # or node src/server.js
    ```
    In another terminal, start the frontend:
    ```bash
    cd frontend
    npm run dev
    ```

    The frontend will typically run on `http://localhost:3000` and the backend on `http://localhost:5000` (or whatever port you configured).

## Usage

1.  **Register Users:**
    -   Navigate to `http://localhost:3000` (or your frontend URL).
    -   Use the registration form to create users. For initial setup, you might manually create an 'admin' user directly in MongoDB or allow registration with a role for testing.
    -   **Initial Admin User (Manual MongoDB Insert):**
        To quickly get an admin user, you can manually insert one into your `users` collection in MongoDB. Remember to hash the password using `bcrypt` before inserting, or create a registration endpoint that allows setting roles for initial setup.
        Example (using `mongosh`):
        ```javascript
        db.users.insertOne({
            username: "adminuser",
            email: "admin@example.com",
            password: "$2a$10$YOUR_BCRYPT_HASH_HERE", // Replace with a bcrypt hash of "password123" or similar
            role: "admin",
            createdAt: new Date()
        });
        ```
        You can generate a bcrypt hash using a simple Node.js script:
        ```javascript
        import bcrypt from 'bcryptjs';
        async function hashPassword() {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash('your_desired_password', salt);
            console.log(hash);
        }
        hashPassword();
        ```

2.  **Login:**
    -   Use the login form with registered user credentials.
    -   Upon successful login, you'll be redirected to the dashboard.

3.  **Explore Dashboard:**
    -   The dashboard UI will change based on the logged-in user's role.
    -   **Admin:** Access to User Management (list, edit roles, delete) and System Logs.
    -   **Editor:** Access to Content Management (create, view, edit, delete posts).
    -   **Viewer:** Read-only access to published content.

4.  **Test Permissions:**
    -   Try to access routes or perform actions that are not allowed for your current role. Observe the error messages and redirects.

## API Endpoints

All API endpoints are prefixed with `/api`.

**Authentication:**
-   `POST /api/auth/register`: Register a new user.
-   `POST /api/auth/login`: Authenticate a user and get a JWT token.
-   `GET /api/auth/profile`: Get the current user's profile (requires authentication).

**User Management (Admin Only):**
-   `GET /api/users`: Get a list of all users.
-   `PUT /api/users/:id/role`: Update a user's role.
-   `DELETE /api/users/:id`: Delete a user.

**Content Management (Editor Only, Viewer can GET):**
-   `GET /api/content/posts`: Get all posts (Editor sees all, Viewer sees only published).
-   `POST /api/content/posts`: Create a new post (Editor only).
-   `PUT /api/content/posts/:id`: Update an existing post (Editor only).
-   `DELETE /api/content/posts/:id`: Delete a post (Editor only).

**System Logs (Admin Only):**
-   `GET /api/logs`: Get all system activity logs.

## Roles and Permissions

| Role     | Description                                       | Frontend UI Access                                | Backend API Access                                       |
| :------- | :------------------------------------------------ | :------------------------------------------------ | :------------------------------------------------------- |
| `admin`  | Full control over users, content, and system logs. | User Management, System Logs, Content Management. | All `/api/users`, `/api/content`, `/api/logs` endpoints. |
| `editor` | Manage (CRUD) content.                            | Content Management.                               | `/api/content` (CRUD), `/api/auth/profile`.            |
| `viewer` | Read-only access to published content.            | View Content.                                     | `/api/content/posts` (GET only), `/api/auth/profile`.  |

## Evaluation Criteria

This project addresses the following evaluation criteria:

-   **Proper separation of concerns:** UI logic is distinct from API logic.
-   **Secure implementation of user roles and route protections:**
    -   Backend middleware enforces role checks for all protected API routes.
    -   Frontend client-side guards prevent unauthorized navigation and hide UI elements.
    -   Password hashing (`bcryptjs`) and JWT for authentication.
-   **Clear and maintainable code:**
    -   Logical folder structure.
    -   Meaningful variable names and comments.
    -   Consistent coding style.
-   **Meaningful error messages:** When unauthorized access is attempted, clear error messages are returned from the API and displayed on the frontend.
-   **Commit History:** (To be maintained by you during development) Clear, atomic commits reflecting progress.

## Contributing

Feel free to fork this repository and submit pull requests.

