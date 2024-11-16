# EventEase - Frontend

## Project Overview
EventEase is a modern event management platform built with React. It offers a seamless experience for event browsing, booking, and management. The application features a personalized dashboard for users to track their events and manage their profiles. The backend part is here [Eventease_Server](https://github.com/priyanshu-gupta07/EventEase-Server) The Website is hosted here [EventEase](https://event-ease-lyart.vercel.app)


![Screenshot from 2024-11-16 00-43-30](https://github.com/user-attachments/assets/b7c1daba-ddb9-4917-b06a-c193af2beda8)

## Features

- **Personalized Dashboard**
  - View upcoming events
  - Track booking history
  - Real-time event updates
- **Event Management**
  - Browse available events
  - Real-time ticket availability
  - Seamless booking process
- **User Profile**
  - Profile customization
  - Personal information management
- **Responsive Design**
  - Mobile-first approach
  - Cross-device compatibility

## Tech Stack
- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Charts**: Chart.js
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **WebSocket**: Socket.io-client
- **Containerization**: Docker
- **Server**: Nginx

## Getting Started

### Prerequisites
- Node.js 18 or higher
- Docker (for containerization)
- npm or yarn

### Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/priyanshu-gupta07/eventease.git
cd eventease
```
2. Install dependencies:
```bash
npm install
```
3. Create environment file:
```bash
cp .env.example .env
```
4. Configure environment variables:
```bash
REACT_APP_GATEWAY_SERVICE_URL=http://localhost:3003
REACT_APP_EVENT_SERVICE_URL=http://localhost:3001
```
5. Start development server:
```bash
npm start
```
## Docker Setup
1. Build the Docker image:
```bash
docker build -t eventease .
```
2. Run the container:
```bash
docker run -p 80:80 eventease
```
The application will be available at http://localhost:80

## Project Structure
```text
eventease/
├── public/              # Static files
├── src/                 # Source files
│   ├── api/            # API integration
│   ├── assets/         # Images and static assets
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── redux/          # State management
│   └── state/          # Store configuration
├── .env.example        # Environment variables template
├── Dockerfile          # Docker configuration
└── package.json        # Dependencies and scripts
```
## Deployment Notes
### Production Deployment
1. Update environment variables for production in .env:
```text
REACT_APP_GATEWAY_SERVICE_URL=<production-gateway-url>
REACT_APP_EVENT_SERVICE_URL=<production-event-url>
```
2. Build and Deploy using Docker
```bash
docker build -t eventease:prod .
docker run -p 80:80 -d eventease:prod
```
-> Important Considerations

Ensure all environment variables are properly configured

Use HTTPS in production

Configure Nginx for production settings

Implement proper error handling and logging
