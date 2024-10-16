# Beam (Ongoing)

## Overview
Beam is a fully responsive live streaming platform that leverages modern technologies to provide a seamless experience for both streamers and viewers. 

### Key Features
- Live streaming functionality powered by **LiveKit**
- Real-time chat integration using **Pusher**
- Data persistence managed through **PostgreSQL**
- User-friendly interface designed with **Tailwind CSS**

## Tech Stack
- **Frontend**: Next.js, TypeScript, React.js, Redux, NextAuth, Tailwind CSS
- **Backend**: Prisma, PostgreSQL, Neon
- **Real-time Communication**: Pusher, LiveKit
- **Others**: Bcript, Gemini, REST APIs
- **Deployment**: Vercel

## Screenshots
| Screen | Description |
|--------|-------------|
| ![Home](public/beam/home.png) | Users can navigate the current streams, search for streamers, and see followed and recommended ones. |
| ![Dashboard](public/beam/dashboard.png) | Users can access the creator's dashboard for managing live streams. |
| ![Stream Keys](public/beam/keys.png) | Streamers can generate live stream keys utilizing LiveKit Ingress. |
| ![Community Management](public/beam/community.png) | Streamers can manage their community, block or unblock users. |
| ![Profile Management](public/beam/profile.png) | Users can manage their profiles and visit other users' profiles. All views support dark and light themes based on user preference. |
| ![Account Settings](public/beam/settings.png) | Users can manage their account settings. |
| ![Language Settings](public/beam/settings_2.png) | Users can change the language and more. |
| ![Mobile Sidebar](public/beam/mobileSidebar.png) | A custom mobile sidebar for a responsive design. |
| ![Signup](public/beam/signup.png) | Users can create a custom account that is inserted into the Neon PostgreSQL database using a Prisma schema. |
| ![Login](public/beam/login.png) | Users can log in via a custom account or using Google OAuth. Authentication is handled via NextAuth, providing a session used across all pages to verify user authentication. |

## Conclusion
This project is still in progress, and further updates will be provided as development continues.

## Links
- **Demo**: Coming soon...
