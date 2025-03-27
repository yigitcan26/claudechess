# Chess Mobile Application

## Technologies Stack
### Backend
- **PostgreSQL** (Database)
- **Node.js** with **Express.js** (Backend API)
- **Docker & Kubernetes** (Containerization & Orchestration)

### Frontend
- **[Expo (React Native - TypeScript) (Cross-platform mobile development)](https://docs.expo.dev/tutorial/create-your-first-app/)**
- **Chess.js** (Chess rules & move validation)
- **Stockfish** (Chess engine for statistics and analysis)
- **Lichess Puzzle API** (Fetching chess puzzles)

### Cloud
- **Cloud Provider:** To be decided (AWS, Google Cloud, Azure, or DigitalOcean)
- **Storage:** Cloud-based database & asset storage (S3-like solution for user-uploaded themes, profile pictures, etc.)
- **Serverless Functions:** Possible use for quick computations

# Features & Content

## Monetization (Ads & Premium)
- **Banner Ads:** Display ads at the top or bottom of the puzzle screen
- **Video Ads:** Play a short video advertisement after every 5 puzzles
- **Premium Subscription:** Removes ads and unlocks additional features

## Navigation Sidebar
- **Home Screen**
- **Language Selection**
- **Profile & Login**
- **Puzzle Types**
- **Premium Membership**
- **Friends (Challenge & Invitations)**
- **Board Themes**
- **Piece Themes**
- **Background Themes**
- **Ranks & Leaderboards (Weekly, Monthly, Yearly)**
- **Daily Puzzle**
- **Settings**
- **Logout**

## Loading Screen
- **Displays app logo and title while loading**

## Home Screen
- **Fetches a random puzzle**
- **If the daily puzzle hasn’t been solved, prioritize showing it**
- **Streak progress bar for user engagement**

## Profile & Login
- **User Information & Editable Fields**
- **Redirects to the login page if not signed in**
- **Displays player statistics**

## Puzzle Types
- **Fetched from Lichess API**
- **Categories: Very Hard, Hard, Medium, Easy**
- **Difficulty levels contribute to ranking points (e.g., 5 points per difficulty level)**

## Premium Membership
- **Displays membership tiers and prices**
- **Google Pay / Apple Pay integration for purchasing**

## Friends & Challenges
- **Users can send friend requests via unique IDs**
- **Challenges: Players can create and send challenges specifying puzzle difficulty and type**
- **Compete with friends in timed puzzle battles**

## Customization
### Board Theme
- **Users select from predefined themes**

### Piece Theme
- **Users select different chess piece styles**

### Background Theme
- **Users choose from predefined backgrounds or upload their own images**

## Ranks & Leaderboards
- **Users can see their ranking among other players**
- **Leaderboard updates: Weekly, Monthly, and Yearly rankings**

## Daily Puzzle
- **A new puzzle is available daily**
- **Completing it grants additional ranking points**

## Settings
- **Various user-configurable options**

# Backend Design

## Database Schema
### User
- **Username**
- **Password** (Hashed with Bcrypt)
- **Solved Puzzles**
- **Rank**
- **Friends**
- **Challenges**
- **User Role** (Premium/Regular)

### Role
- **Name**
- **Permissions**

### Authorities
- **Authorization Names**

### Challenge
- **List of Participants**
- **Puzzle List**
- **Winner**

### Participant
- **User Reference**
- **Score**

### Ranks
- **Name**
- **Points Required**
- **Badge**

## Stockfish Integration
- **Stockfish engine will be embedded into the backend**
- **API to analyze user moves and provide feedback**
- **Evaluate puzzle solutions and suggest best moves**
- **Possible cloud-hosted or WebAssembly-based execution for better performance**

# Premium Subscription Model
### Standard Plan
- **$2 per month**
- **$20 per year** (Save $4)
- **Removes ads and unlocks exclusive features**

### Future Premium Plans
- **Additional tiers can be introduced in later versions**

# Cloud Infrastructure (To Be Decided)
- **Hosting:** AWS EC2, Google Cloud Run, or DigitalOcean Droplets
- **Storage:** AWS S3, Google Cloud Storage, or Firebase Storage for user assets
- **Database:** Cloud-managed PostgreSQL (AWS RDS, GCP Cloud SQL, or Supabase)
- **Authentication:** Firebase Auth, AWS Cognito, or custom JWT-based auth
- **Serverless Functions:** AWS Lambda or Google Cloud Functions for Stockfish calculations and puzzle fetching

# Future Roadmap
## Trainer Integration (Future Versions)
- **Chess trainers can assign puzzles to students**
- **A premium feature for chess coaches**

## LLM (AI Tutor) Support (Premium Feature)
- **Stockfish move explanations in human-readable text**
- **AI-powered coaching for better learning**
- **Premium subscription required**

This document outlines the chess puzzle mobile app with a robust backend, cloud integrations, monetization strategies, and future expansion plans.

