# StreamerStash Frontend

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

The official frontend application for **StreamerStash.com**, a marketplace for high-quality digital assets for streamers and content creators. This project was built with React, Vite, and Tailwind CSS.

**[View Live Demo](https://streamerstash.com)** *(Note: Link to be updated when deployed)* · **[Backend API Repository](https://github.com/kerem-sirin/streamerstash-api)**

---

<br>

### **Table of Contents**
1.  [About The Project](#about-the-project)
2.  [Tech Stack](#tech-stack)
3.  [Features Implemented](#features-implemented)
4.  [Getting Started](#getting-started)
5.  [License](#license)

---

## About The Project

This repository contains the user-facing storefront for StreamerStash, a full-featured e-commerce platform where artists can sell digital assets to content creators. It provides a complete user experience, from browsing and filtering products to a secure, multi-step checkout process.

This application is designed to be a fast, modern, and responsive Single Page Application (SPA) that communicates with the `streamerstash-api` backend.

## Tech Stack

-   **Framework:** React with Vite
-   **Styling:** Tailwind CSS
-   **Routing:** React Router DOM
-   **State Management:** React Context API
-   **API Communication:** Axios
-   **Payments:** Stripe.js / React Stripe.js

## Features Implemented

The current version (`v0.1.0`) includes the complete Minimum Viable Product functionality.

✔️ **Core Layout & Navigation**
-   A fully responsive layout with a persistent Navbar and Footer.
-   Client-side routing for a seamless, multi-page experience.

✔️ **User Authentication & Session Management**
-   Functional Login and Registration pages.
-   Global session management using a React Context, keeping users logged in across sessions via `localStorage`.
-   Dynamic UI elements that change based on the user's authentication state.

✔️ **Product Discovery**
-   Homepage featuring the latest products.
-   A dedicated "Browse" page with a filterable and sortable product grid.
-   Advanced filtering by category, price range, and multi-select tags.
-   Sorting by price (ascending and descending).
-   A detailed product page for viewing individual items.

✔️ **Complete E-Commerce Flow**
-   A fully functional shopping cart with the ability to add and remove items.
-   A multi-step checkout process that converts a cart into a formal order.
-   Secure payment processing via integration with the Stripe Payment Elements form.
-   An order confirmation page is displayed after a successful transaction.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later)
-   npm
-   A running instance of the [streamerstash-api](https://github.com/kerem-sirin/streamerstash-api) backend.

### Installation

1.  **Clone the repo**
    ```
    git clone https://github.com/kerem-sirin/streamerstash-frontend.git
    ```
2.  **Change Directory and Install NPM packages**
    ```
    cd streamerstash-frontend
    ```
    ```
    npm install
    ```
3.  **Set up environment variables**
    -   Create a `.env` file in the root of the project.
    -   Add the following variables, ensuring they point to your local backend and your Stripe account.
        ```env
        # The base URL for your running backend API
        VITE_API_BASE_URL=http://localhost:8080/api

        # Your Stripe Publishable Key (from the Stripe Dashboard)
        VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
        ```
4.  **Run the development server**
    ```
    npm run dev
    ```
    The frontend will be available at a local URL, typically `http://localhost:5173`.

## License

Distributed under the MIT License. See `LICENSE` for more information.
