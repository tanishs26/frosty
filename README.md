# Frosty - A Movie Search App 

Frosty is a modern movie search application built with **React.js**, **Node.js**, **Tailwind CSS**, and **Appwrite**. It allows users to search for movies across the web, tracks real-time searches, and displays trending movies based on user activity. The app is hosted on **Vercel** and provides a seamless user experience with features like debounced search, loading states, and error handling.

=> **Live Preview**: [https://frosty-roan.vercel.app](https://frosty-roan.vercel.app)

---

## Features :

- **Movie Search**: Search for movies using a debounced input to reduce API calls.
- **Realtime Search Tracking**: Tracks user searches in real-time using **Appwrite**.
- **Trending Movies**: Displays trending movies based on the most frequent searches.
- **Responsive Design**: Built with **Tailwind CSS** for a sleek and responsive UI.
- **Loading States**: Displays loading spinners while fetching data.
- **Error Handling**: Shows user-friendly error messages for failed API requests.
- **Rate Limiting**: Prevents abuse of the movie search API.

---

## Tech Stack :

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Backend-as-a-Service**: Appwrite (for real-time database and search tracking)
- **Hosting**: Vercel (frontend and backend)
- **APIs**: TMDb (The Movie Database)

---

## How It Works 

1. **User Searches for a Movie**:
   - The frontend sends the search query to the backend.
   - The backend fetches movie data from the TMDb API.

2. **Track Searches in Real-Time**:
   - The backend stores the search query in **Appwrite’s database**.
   - Appwrite’s real-time capabilities update the trending movies list instantly.

3. **Display Trending Movies**:
   - The frontend fetches trending movies from Appwrite and displays them.

---

## Installation 

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Appwrite account (for backend)
- TMDb API key

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/frosty.git
   cd frosty