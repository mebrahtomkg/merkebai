# MerkebAI

## 1. Introduction

**MerkebAI** is a high-performance, resilient, real-time AI chat platform engineered for reliability, privacy, and seamless data synchronization. Built upon the robust foundation of the SemayChat codebase, MerkebAI is specifically tailored for advanced AI interactions. The system is built with a focus on architectural integrity, ensuring that the interface remains fluid and the data remains consistent, even under the demands of complex media handling, AI response streaming, and unreliable networks.

<p align="center">
  <img src="https://github.com/user-attachments/assets/08ba9551-303a-4a5b-8ba1-7f71e303a3b2" alt="MerkebAI Preview" width="800">
</p>

## 2. Features

The platform provides a comprehensive suite of features designed for a modern AI chat experience. These capabilities are implemented with a focus on user autonomy and intuitive interaction.

- **High-end, Attractive UI/UX:** Modern aesthetics and animated user interfaces.

- **Real-Time AI Messaging & Streaming:** Instantaneous exchange of text messages with live streaming of AI responses (powered by models like Gemini 2.5 Flash).

- **Smart Chat Title Generation:** Automatically generates concise, context-aware titles for your conversations using a lightweight AI model.

- **Mobile-Optimized Navigation:** Features a custom hardware back-button integration (`useHardwareBack`) that seamlessly manages mobile navigation stacks, allowing users to close modals and sidebars using their device's native back button.

- **Secure JWT Authentication:** Industry-standard authentication using JSON Web Tokens (JWT) stored in `httpOnly` and `Secure` cookies to prevent XSS and ensure session integrity.

- **Persistent State:** All conversations and generated titles are persisted, ensuring a continuous experience across devices and browser refreshes.

- **Ability to Clear Messaging History:** Users can delete individual messages and entire chats.

- **Theming:** The application supports both dark and light themes seamlessly.

## 3. Live Demo & Distributed Architecture

The live demo serves as a reference for a **distributed, cloud-native architecture**. It demonstrates that MerkebAI is a resilient system capable of operating across geographically separated infrastructure providers while maintaining sub-second latency.

### 3.1 Deployment Stack

- **Frontend (Edge Layer):** Hosted on **Cloudflare Pages** via an automated **CI/CD pipeline**. Every push to the main branch triggers an atomic build, distributing the UI across Cloudflare’s global edge network for instant loading.

- **Backend (Compute Layer):** Deployed on **Render** using a managed deployment workflow. The backend handles real-time socket connections, AI API streaming, and business logic.

- **Database (Persistence Layer):** **PostgreSQL** hosted on **Supabase**. This provides a managed, high-performance relational database that eliminates manual maintenance and ensures data consistency at scale.

- **Service Monitoring:** Integrated with **UptimeRobot** for continuous health auditing. This system monitors service availability and provides real-time alerts to ensure high-reliability standards.

### 3.2 Distributed System Proof-of-Concept

The production instance proves the platform's ability to function as a **decoupled distributed system**. By separating the UI (Cloudflare), the Logic (Render), and the Data/Storage (Supabase), the architecture eliminates single points of failure. This setup demonstrates how each component can scale independently based on demand.

### 3.3 Explore the Live Demo

**Access the fully functional production instance here:**
**[MerkebAI Live Demo](https://merkebai.mebrahtom.com)**

## 4. Technologies Used

The technology stack selection was strategic, prioritizing type safety, modularity, and database flexibility. Each technology serves a specific, well-defined purpose in the application's lifecycle.

- **`TypeScript` (98% Codebase):** The application utilizes `TypeScript` across the entire stack to enforce strict typing and developer confidence.
- **`React` (Frontend Framework):** The frontend is built on `React` for component-based UI logic.
- **`Styled Components`:** `Styled Components` are used exclusively for styling, providing a CSS-in-JS solution.
- **`React Query` & `Zustand`:** Manage asynchronous server-state and local client-side UI state with a minimal memory footprint.
- **`React Router`:** Used as the routing library in the application.
- **`Node.js` & `ExpressJS`:** The backend runtime environment and framework, leveraging non-blocking I/O to handle high-concurrency messaging and AI streaming efficiently.
- **`Socket.io`:** Serves as the real-time transport layer, enabling bi-directional, low-latency communication (crucial for streaming AI text deltas).
- **`Sequelize ORM`:** Provides full support for `PostgreSQL`, `MySQL`, and `SQLite`, allowing for flexible deployment environments.
- **`OpenAI SDK`:** Utilized as a flexible client to interface with AI endpoints (configured to connect to Gemini models).
- **`Zod`:** Used as a schema validation tool and library.

## 5. Architectural Details

The architecture is designed to manage the complexity inherent in a large-scale AI messaging application.

- **AI Streaming & Title Generation Pipeline:** When a user sends a prompt, the backend initiates a streaming connection with the AI provider. Text deltas are instantly piped to the client via `Socket.io` for a real-time typing effect. Once the response completes, an asynchronous background job is triggered to generate a contextual title for the chat without blocking the user's workflow.

- **Queue-Based Message Request System:** The application decouples user actions from immediate API calls. Actions like sending or deleting messages are transformed into "request" objects and pushed into a global `Zustand` store queue, ensuring strict message ordering (`FIFO`) and UI fluidity.

- **ACID-Compliant Transaction Management & Concurrency Control:** To guarantee absolute data integrity, the backend employs a strict transactional architecture for all state-mutating operations. Whether creating a new chat, saving an AI response, or handling attachments, every action is wrapped in a `Sequelize` managed transaction.

- **Hardware Back Button Interception:** A custom React hook (`useHardwareBack`) intelligently manipulates the browser's History API. When modals or sidebars open, it pushes a temporary state to the history stack. If the user presses the physical back button on a mobile device, the application intercepts the `popstate` event to close the UI element instead of navigating away from the app.

- **Custom Rspack Build Pipeline & Service Worker Orchestration:** The application utilizes a bespoke Rspack plugin to manage the compilation and injection lifecycle of the Service Worker, handling content-based hashing for robust cache busting.

- **Viewport-Aware Context Menu System:** The app has its own custom low-level highly intelligent context menu UI component that dynamically calculates optimal menu placement to prevent screen overflow.

- **Declarative Lifecycle Animation Engine:** The platform uses a custom-built animation system that synchronizes `React`’s mount/unmount lifecycle with hardware-accelerated `CSS` transitions.

- **High-Performance Theming Architecture:** The application implements a "**Zero-Lag**" theming system by dynamically injecting `CSS` variable blocks into the document root based on the user's preference.

- **Environment-Agnostic Configuration Architecture:** The system is engineered with a strict separation between core business logic and infrastructure dependencies.

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

This project requires **zero configuration** to get started. However, it is highly configurable via environment variables to suit production-grade deployments.

### 7.1 Backend (Server) Configuration

To customize the backend of the app, create a `.env` file in the `server` directory, and use the following environment variables.

- **`JWT_SECRET_KEY`**: Secret key used to sign JSON Web Tokens for authentication.

  - Default: `temp-secret-key-1`
  - Required in production

- **`ALLOWED_ORIGINS`**: Comma-separated list of allowed CORS origins. In production, ensure this is explicitly set to your frontend domain to prevent unauthorized cross-origin requests.

  - Default: `http://localhost:8080` in development

- **`DATABASE_DIALECT`**: The database system to use.

  - Options:

    1. `sqlite`: Ideal for local development. No external setup is required. The database file is stored locally.

    2. `postgres`: Recommended for production.

  - Default: `sqlite`

- **`SQLITE_DATABASE_DIR`**: Absolute path to the directory where the SQLite database file will be stored.

  - Default: `server/database`

- **`POSTGRES_DATABASE_URI`**: The connection string for PostgreSQL. (Required if dialect is `postgres`)

- **`ADMIN_SECRET_KEY`**: A secret key required to perform administrative tasks remotely via API. (Required if there is a desire to perform administrative tasks via API). Not recommended in production.

### 7.2 Frontend (Client) Configuration

To customize the frontend of the app, create a `.env` file in the `client` directory using the following environment variables:

- **`API_URL`**: The base API URL of the app backend. This value is injected into the `window` object and the `Service Worker` to handle API requests and media fetching.

  - **In Development:** This option is ignored. The app uses a **Smart API Discovery Mode**. It automatically points to the current network hostname on port 3000 (e.g., if the frontend is served at `http://localhost:8080`, the `API_URL` becomes `http://localhost:3000/api`; if the frontend is served at `http://192.168.1.5:8080`, the `API_URL` becomes `http://192.168.1.5:3000/api`). This allows a developer to test the app on real mobile devices connected to the same Wi-Fi or hotspot without manual configuration.

  - **In Production:** This value is required and is used by the UI and Service Worker to handle all API requests and media fetching.

- **`PUBLIC_PATH`**: Defines the base path for all frontend assets and the `Service Worker` registration. Use this if hosting the application in a subdirectory.

  - **Default:** `/`
