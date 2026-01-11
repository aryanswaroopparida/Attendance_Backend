# Attendance Management Backend

A scalable and modular backend system for managing attendance records with automated scheduling, caching, and database persistence. Built to handle daily attendance operations efficiently with timezone-aware cron jobs.

## Features

- RESTful APIs for attendance management
- Automated cron jobs for scheduled attendance tasks
- Redis caching for improved performance
- Timezone-aware scheduling (Asia/Kolkata / IST)
- Clean and modular project structure
- Database abstraction for easy scalability

## Tech Stack

- Node.js
- Express.js
- Redis
- node-cron
- JavaScript (ES Modules)
- Database (MongoDB)

## Installation

1. Clone the repository
   git clone this repo
   cd attendance-backend

2. Install dependencies
   npm install

3. Configure environment variables
   Create a .env file in the root directory

4. Start the server
   npm start

## Environment Variables

PORT=3000  
DB_URI=your_database_url  
REDIS_URL=your_redis_url   

## Cron Jobs

The system uses cron jobs for automated attendance processing such as:
- Nightly attendance updates
- Daily status validation
- Scheduled cleanup tasks

All cron jobs are timezone-aware.

## Caching

- Redis is used to cache frequently accessed attendance data
- Reduces database load and improves response time
- Cache is invalidated automatically on updates

## Error Handling

- Centralized error handling
- Consistent API responses
- Proper HTTP status codes

## Future Enhancements

- Authentication and authorization
- Admin dashboard
- Attendance analytics
- Data export (CSV/Excel)
- Notification system

## License

MIT License

## Author

Aryan Swaroop Parida
