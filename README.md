# MerkebAI

## 1. Introduction

**MerkebAI** is an open-source, production-grade, real-time AI chat application. Engineered to be highly resilient and reliable, the system ensures that the interface remains fluid and data remains consistent, even during live AI response streaming and over unstable networks.

<p align="center">
  <img src="https://github.com/user-attachments/assets/08ba9551-303a-4a5b-8ba1-7f71e303a3b2" alt="MerkebAI Preview" width="800">
</p>

## 2. Features

The platform delivers a comprehensive suite of features designed for a modern, production-grade AI chat experience, prioritizing user autonomy and intuitive interaction.

- **Premium UI/UX:** Modern aesthetics with fluid animations for a highly responsive and engaging interface.

- **Real-Time AI Messaging & Streaming:** Instantaneous message exchange featuring live, low-latency streaming of AI responses.

- **Smart Chat Title Generation:** Automatically generates concise, context-aware titles for conversations using lightweight AI processing.

- **Mobile-Optimized Navigation:** Includes custom hardware back-button integration (`useHardwareBack`) that gracefully manages mobile navigation stacks, allowing users to dismiss modals and sidebars using native device controls.

- **Secure JWT Authentication:** Employs industry-standard JSON Web Tokens (JWT) stored in `httpOnly` and `Secure` cookies to mitigate XSS vulnerabilities and guarantee session integrity.

- **Persistent State Management:** Automatically saves all conversations and metadata, ensuring a seamless, continuous experience across devices and browser sessions.

- **Granular History Control:** Empowers users with complete data autonomy, providing the ability to seamlessly delete individual messages or clear entire chat histories.

- **Dynamic Theming:** Seamlessly supports and transitions between light and dark modes based on user preference.

## 3. Live Demo & Distributed Architecture

The live demo showcases a **distributed, cloud-native architecture**. It demonstrates MerkebAI's ability to operate reliably across decoupled infrastructure providers while maintaining low latency.

### 3.1 Deployment Stack

- **Frontend (Edge Layer):** Hosted on **Cloudflare Pages** with an automated CI/CD pipeline for global edge distribution and fast load times.

- **Backend (Compute Layer):** Deployed on **Render**, handling real-time socket connections, AI API streaming, and core business logic.

- **Database (Persistence Layer):** **PostgreSQL** hosted on **Supabase**, providing a managed, reliable relational database to ensure data consistency.

- **Service Monitoring:** Integrated with **UptimeRobot** for continuous health monitoring and uptime alerts.

### 3.2 Distributed System Design

The deployment serves as a practical example of a **decoupled system**. By separating the frontend UI (Cloudflare), backend logic (Render), and database storage (Supabase), the architecture allows each layer to be maintained and scaled independently based on demand.

### 3.3 Explore the Live Demo

**Access the functional production instance here:**
**[MerkebAI Live Demo](https://merkebai.mebrahtom.com)**

## 4. Technologies Used

The technology stack prioritizes type safety, modularity, and deployment flexibility across the entire application lifecycle.

- **`TypeScript`:** Enforces strict typing across the entire codebase.
- **`React`:** Powers the component-based user interface.
- **`Styled Components`:** Provides a modular, component-level CSS-in-JS styling solution.
- **`React Query` & `Zustand`:** Handle asynchronous server state and local UI state with a minimal memory footprint.
- **`React Router`:** Manages client-side routing.
- **`React Markdown` & `Remark GFM`:** Parse and render structured AI responses with support for GitHub Flavored Markdown.
- **`Node.js` & `ExpressJS`:** Backend runtime and web framework optimized for asynchronous streaming and real-time requests.
- **`Socket.io`:** Serves as the transport layer for bi-directional, low-latency streaming of messages.
- **`Sequelize ORM`:** Manages database operations with support for `PostgreSQL`, `MySQL`, and `SQLite`.
- **`OpenAI SDK`:** Provides a flexible client interface to integrate with compatible AI model endpoints.
- **`Zod`:** Ensures runtime type safety and schema validation.

## 5. Architectural Details

The system is built to handle the complexities of a fast, reliable AI chat application, balancing technical robustess with a smooth user experience.

- **AI Streaming & Background Tasks:** When a user sends a prompt, the system streams the AI's response in real-time for immediate feedback. Once the reply completes, an asynchronous background task generates a context-aware chat title without interrupting the user's workflow.

- **Queue-Based Message Handling:** To maintain a responsive interface, actions like sending or deleting messages are placed in a processing queue. This ensures strict message ordering (`FIFO`) and prevents the UI from freezing during server communication.

- **Transactional Data Integrity:** Every state-mutating operation, such as creating a chat or saving a message, is wrapped in database transactions. If any part of the process fails, the system safely rolls back the action to prevent corrupted or orphaned data.

- **Mobile Navigation Integration:** A custom hook integrates directly with a mobile device's hardware back button. If a modal or sidebar is open, pressing the native back button intercepts the browser history to safely close the UI element rather than navigating away from the application entirely.

- **Viewport-Aware Context Menus:** A dynamic context menu component automatically calculates its placement based on the current screen dimensions, ensuring that interactive options remain fully visible and do not overflow the viewport edges.

- **Declarative Custom Animation Engine:** The application synchronizes the UI component lifecycle with hardware-accelerated `CSS` transitions. The custom `useAnimation` hook strategically utilizes double `requestAnimationFrame` to mitigate DOM update batching, and strictly manages cleanup timers to prevent lingering animation styles from breaking layout positioning. Aggressive memoization prevents infinite re-render cycles.

- **Zero-Lag Theming:** The application transitions between light and dark themes instantaneously by dynamically injecting CSS variable blocks directly into the document root, bypassing heavy render cycles.

- **Environment-Agnostic Configuration:** The core application logic is strictly separated from its infrastructure dependencies. This allows the system to be easily deployed across various hosting environments without requiring significant codebase modifications.

## 6. Getting Started

Follow these steps to run **MerkebAI** locally in development mode.

### Prerequisites

- **Node.js:** Version `20.18.1` or higher.
- **pnpm:** This project uses `pnpm` as the package manager.

### Installation

1. **Clone the repository** and navigate to the project root.
2. **Install root dependencies:** In the root project run:
   ```bash
   pnpm install
   ```
3. **Install backend(server) dependencies:** Navigate to the `server` directory and run:
   ```bash
   pnpm install
   ```
4. **Install frontend(client) dependencies:** Navigate to the `client` directory and run:
   ```bash
   pnpm install
   ```

### Database Initialization

Before running the server for the first time, initialize the database schema. This command creates the necessary tables based on the Sequelize models:

```bash
# Inside the server directory
pnpm run db:reset
```

Note: This will drop existing tables and recreate them. Use with caution.

### Running the Application

You will need to run the backend and frontend simultaneously in separate terminals.

**Start the Backend:** Navigate to the `server` directory and run:

```bash
pnpm run dev
```

**Start the Frontend:** Navigate to the `client` directory and run:

```bash
pnpm run dev
```

The application will be accessible at the address provided by the Rspack dev server (typically `http://localhost:8080`).

### Code Quality

From the **root** directory, you can run the following to maintain code standards:

```bash
# Run Biome linter
pnpm run lint

# Format code with Prettier
pnpm run prettier:format
```

## 7. Configuration

This project is designed to require **zero configuration** for local development. However, it provides extensive environment variables to customize the deployment for production environments.

### 7.1 Backend (Server) Configuration

To configure the backend runtime for local development, create a `.env` file in the `server` directory. For production deployments, set these variables directly within your hosting provider's environment configuration dashboard (e.g., Render, AWS, Heroku).

- **`JWT_SECRET_KEY`**

  - **Required:** Yes (in Production).
  - **Default:** `temp-secret-key-1` (in Development).
  - **Description:** The secret key used to cryptographically sign JSON Web Tokens for authentication.

- **`ALLOWED_ORIGINS`**

  - **Required:** Yes (in Production to prevent unauthorized cross-origin requests).
  - **Default:** `http://localhost:8080` (in Development).
  - **Description:** A comma-separated list of allowed CORS origins (e.g., `https://yourdomain.com`).

- **`DATABASE_DIALECT`**

  - **Required:** No.
  - **Default:** `sqlite`.
  - **Description:** The database engine to use. Supported options are `sqlite` (ideal for local development) and `postgres` (recommended for production).

- **`SQLITE_DATABASE_DIR`**

  - **Required:** No.
  - **Default:** A `database` folder located at the root of the server directory.
  - **Description:** The absolute path to the directory where the local SQLite database file will be stored. This is only used if `DATABASE_DIALECT` is set to `sqlite`.

- **`POSTGRES_DATABASE_URI`**

  - **Required:** Yes, but **only** if `DATABASE_DIALECT` is set to `postgres`.
  - **Description:** The full connection string for your PostgreSQL database (e.g., `postgresql://user:password@host:port/database`).

- **`AI_BASE_URL`**

  - **Required:** Yes.
  - **Description:** The base URL for the AI provider's API endpoint.

- **`AI_API_KEY`**

  - **Required:** Yes.
  - **Description:** The API key used to authenticate requests to your chosen AI provider.

- **`ADMIN_SECRET_KEY`**
  - **Required:** No.
  - **Description:** A secret key that enables remote administrative tasks via API requests. Use with caution in production.

### 7.2 Frontend (Client) Configuration

To customize the frontend build for local development, create a `.env` file in the `client` directory. For production, define these variables in your edge/hosting provider's dashboard (e.g., Cloudflare Pages, Vercel).

- **`API_URL`**

  - **Required:** Yes (in Production).
  - **Description:** The base API URL of the app backend. This value is injected into the application and Service Worker to handle API requests accurately.
    - **In Development:** This option is ignored. The app uses a **Smart API Discovery Mode**. It automatically points to the current network hostname on port `3000` (e.g., if the frontend is served at `http://localhost:8080`, the `API_URL` becomes `http://localhost:3000`; if the frontend is served at `http://192.168.1.5:8080`, the `API_URL` becomes `http://192.168.1.5:3000`). This allows a developer to test the app on real mobile devices connected to the same Wi-Fi or hotspot without manual configuration.

- **`PUBLIC_PATH`**
  - **Required:** No.
  - **Default:** `/`.
  - **Description:** Defines the base URL path for all frontend assets and Service Worker registration. Modify this only if you are hosting the application in a specific subdirectory.
