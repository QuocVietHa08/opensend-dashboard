# OpenSend Dashboard

<p align="center">
  <img src="https://s.opensend.com/opensend/assets/881b6e7edacf6fc7c9b829023ba7e4d1/logo_with_text.svg" alt="OpenSend Logo" width="400">
</p>

## Overview

OpenSend Dashboard is a React-based web application that provides a user-friendly interface for managing and monitoring your OpenSend services. This dashboard allows users to authenticate, view analytics, manage transactions, and configure their OpenSend settings in one centralized location.

## Features

### Authentication System
- Secure login and registration process
- Protected routes for authenticated users only
- Session management and persistence
- Password recovery functionality

### Dashboard Analytics
- Real-time transaction monitoring
- User activity tracking
- Performance metrics visualization
- Custom date range filtering

### Transaction Management
- View and search transaction history
- Filter transactions by status, date, and type
- Export transaction data
- Transaction detail view

### User Management
- User profile management
- Role-based access control
- Team member invitation system

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **State Management**: Redux/Context API
- **Routing**: React Router
- **Styling**: CSS/SCSS with component libraries
- **Authentication**: JWT-based authentication
- **API Communication**: Axios/Fetch

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/opensend-dashboard.git

# Navigate to the project directory
cd opensend-dashboard

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm start
# or
yarn start
```

### Environment Configuration

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_API_URL=your_api_url
REACT_APP_AUTH_DOMAIN=your_auth_domain
```

## Usage

After starting the development server, navigate to `http://localhost:3000` in your browser to access the dashboard.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
