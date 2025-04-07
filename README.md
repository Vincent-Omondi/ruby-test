# Test Project

A web application for discovering and sharing locations around the world. Users can add their own locations with geographic coordinates and view everyone's locations on an interactive map.

## Features

- Interactive map display with all locations
- Location cards with detailed information
- User authentication system
- Add, view, and delete locations
- Responsive design for mobile and desktop devices

## Prerequisites

- Ruby 3.0.0 or newer
- Rails 7.1.x
- PostgreSQL 12 or newer
- Node.js 14.0.0 or newer
- Yarn or npm

## Getting Started

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Vincent-Omondi/ruby-test.git
   cd test-project
   ```

2. Install dependencies
   ```bash
   bundle install
   yarn install  # or npm install
   ```

3. Database setup
   ```bash
   rails db:create
   rails db:migrate
   rails db:seed  # optional, to add sample data
   ```

4. Start the server
   ```bash
   rails server
   ```

5. Visit `http://localhost:3000` in your browser

### Quick Start Script

A convenience script is provided to set up and run the application in one step:

```bash
# Make the script executable
chmod +x start.sh

# Run the script
./start.sh
```

## Database Structure

The application uses PostgreSQL with the following main models:

- **User**: Authentication and user management
- **Place**: Geographic locations with name, description, coordinates
- **Role**: User permissions (using rolify gem)

## Technology Stack

- **Backend**: Ruby on Rails 7.1
- **Frontend**: 
  - React.js (via Inertia.js)
  - TailwindCSS for styling
- **Authentication**: Devise
- **Authorization**: Pundit
- **Maps**: Leaflet.js
- **Database**: PostgreSQL

## Development

### Running Tests

```bash
rails test
```

### Code Linting

```bash
rubocop
```

### Frontend Development

The application uses Inertia.js with React, allowing for a single-page application experience while keeping the backend in Rails. When making frontend changes, you can start the webpack development server:

```bash
bin/dev
```

This will start both Rails and Webpack in development mode with hot reloading.

## Deployment

### Production Setup

1. Precompile assets
   ```bash
   RAILS_ENV=production rails assets:precompile
   ```

2. Set required environment variables
   ```bash
   export DATABASE_URL=postgres://username:password@host:port/database
   export RAILS_MASTER_KEY=your_master_key
   ```

3. Start the server
   ```bash
   RAILS_ENV=production rails server
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
