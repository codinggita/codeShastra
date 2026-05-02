# CodeShastra Deployment Guide

This guide provides instructions for deploying the CodeShastra platform using **Render** for the backend and **Vercel** for the frontend.

## 1. Backend Deployment (Render)

1.  **Create a Web Service**: Log in to [Render](https://render.com/) and create a new "Web Service".
2.  **Connect GitHub**: Select your repository.
3.  **Basic Settings**:
    *   **Root Directory**: `backend`
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
4.  **Environment Variables**: Add the following in the Render "Environment" tab:

| Key | Value / Source |
| :--- | :--- |
| `MONGO_URI` | Your MongoDB Atlas connection string (ensure 0.0.0.0/0 is allowed in Atlas) |
| `JWT_SECRET` | A long, unique random string (e.g., `8f2e9...`) |
| `NODE_ENV` | `production` |

5.  **Deploy**: Once deployed, copy your backend URL (e.g., `https://codeshastra-backend.onrender.com`).

---

## 2. Frontend Deployment (Vercel)

1.  **Create a Project**: Log in to [Vercel](https://vercel.com/) and click "Add New" > "Project".
2.  **Import Repo**: Import your GitHub repository.
3.  **Project Settings**:
    *   **Root Directory**: `frontend`
    *   **Framework Preset**: `Vite` (Vercel should auto-detect this)
4.  **Environment Variables**: Add the following in the Vercel "Environment Variables" section:

| Key | Value |
| :--- | :--- |
| `VITE_API_URL` | Your **Render Backend URL** (e.g., `https://codeshastra-backend.onrender.com`) |

> [!IMPORTANT]
> Do **NOT** add a trailing slash to the `VITE_API_URL`.

5.  **Deploy**: Click deploy. Vercel will use the `vercel.json` we created to handle routing.

---

## 3. Post-Deployment Checklist

- [ ] **MongoDB Access**: Go to MongoDB Atlas > Network Access and ensure `0.0.0.0/0` is added so Render can connect.
- [ ] **Verify API**: Visit your Render URL. You should see "CodeShastra API is running...".
- [ ] **Test App**: Open your Vercel URL, try to sign up, and verify that the dashboard loads correctly.
- [ ] **Test Code Execution**: Submit a challenge solution to ensure the Node.js execution engine works on Render.

