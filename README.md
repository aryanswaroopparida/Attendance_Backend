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
- Database (configurable: MongoDB / SQL)

## Project Structure

attendance-backend/
├── config/
│   └── config.js
├── db/
│   └── methods.js
├── models/
│   └── attendance.js
├── redis/
│   └── methods.js
├── utils/
│   ├── cron.js
│   └── time.js
├── controllers/
│   └── attendance.js
├── routes/
│   └── attendance.js
├── app.js
└── package.json

## Installation

1. Clone the repository
   git clone https://github.com/your-username/attendance-backend.git
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
TIMEZONE=Asia/Kolkata  

## Cron Jobs

The system uses cron jobs for automated attendance processing such as:
- Nightly attendance updates
- Daily status validation
- Scheduled cleanup tasks

All cron jobs are timezone-aware.

## API Endpoints (Sample)

POST   /attendance/mark        → Mark attendance  
GET    /attendance/:userId     → Get user attendance  
GET    /attendance/report      → Attendance summary  

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
