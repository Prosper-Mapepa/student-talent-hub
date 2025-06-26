
Student Talent Hub -
A comprehensive platform for managing student talents, skills, and career opportunities. This application connects students with potential employers and provides a centralized system for showcasing academic achievements, projects, and professional skills.

🚀 Features

For Students
* Profile Management: Create and maintain comprehensive student profiles
* Skills & Talents Showcase: Highlight technical and soft skills with proficiency levels
* Project Portfolio: Upload and showcase academic and personal projects
* Achievement Tracking: Record certifications, awards, and academic milestones
* Career Opportunities: Browse and apply for internships, jobs, and projects
* Networking: Connect with peers, mentors, and industry professionals

For Employers/Recruiters

* Talent Discovery: Search and filter students based on skills, location, and experience
* Job Posting: Create and manage job postings and internship opportunities
* Application Management: Review applications and manage the recruitment pipeline
* Direct Communication: Message students directly through the platform

For Administrators

* User Management: Manage student and employer accounts
* Content Moderation: Review and approve profiles, projects, and job postings
* Analytics Dashboard: Track platform usage and engagement metrics
* System Configuration: Manage platform settings and configurations

🛠️ Technology Stack

Backend
* Framework: NestJS (Node.js)
* Database: PostgreSQL
* ORM: TypeORM
* Authentication: JWT with Passport.js
* API Documentation: Swagger/OpenAPI
* Validation: Class Validator & Class Transformer
* File Upload: Multer
* Email Service: NodeMailer

Additional Tools

* Environment Management: dotenv
* Logging: Winston
* Testing: Jest
* Code Quality: ESLint, Prettier
* Security: Helmet, CORS, Rate Limiting

📋 Prerequisites
Before running this application, make sure you have the following installed:
* Node.js (v18 or higher)
* npm or yarn
* PostgreSQL (v13 or higher)
* Git

🔧 Installation & Setup

1. Clone the Repository
git clone https://github.com/Prosper-Mapepa/student-talent-hub.git
cd student-talent-hub

2. Install Dependencies
npm install
# or
yarn install

3. Environment Configuration
Create a .env file in the root directory and add the following variables:
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=student_talent_hub

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=30d

# Application Configuration
PORT=3000
NODE_ENV=development
API_PREFIX=api/v1

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=noreply@studenttalenthub.com

# File Upload Configuration
MAX_FILE_SIZE=5242880  # 5MB
UPLOAD_DEST=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW=15  # minutes
RATE_LIMIT_MAX=100    # requests per window

# CORS Configuration
CORS_ORIGIN=http://localhost:3000


4. Database Setup

# Create a database
createdb student_talent_hub

# Run migrations
npm run migration: run

# Seed initial data (optional)
npm run seed


5. Start the Application
# Development mode
npm run start: dev

# Production mode
npm run build
npm run start: prod
The application will be available at http://localhost:3000

📖 API Documentation

Authentication Endpoints

Register Student
POST /api/v1/auth/register/student
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123!",
  "dateOfBirth": "1999-05-15",
  "university": "University of Technology",
  "major": "Computer Science",
  "graduationYear": 2024,
  "phoneNumber": "+1234567890"
}

Register Employer
POST /api/v1/auth/register/employer
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@company.com",
  "password": "SecurePassword123!",
  "companyName": "Tech Innovations Ltd",
  "companyWebsite": "https://techinnovations.com",
  "position": "HR Manager",
  "phoneNumber": "+1234567890",
  "companySize": "51-200"
}

Login
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}

Refresh Token
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your_refresh_token_here"
}

Logout
POST /api/v1/auth/logout
Authorization: Bearer <access_token>


Student Profile Endpoints

Get Student Profile
GET /api/v1/students/profile
Authorization: Bearer <access_token>

Update Student Profile
PUT /api/v1/students/profile
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "bio": "Passionate computer science student with expertise in full-stack development",
  "location": "New York, NY",
  "website": "https://johndoe.dev",
  "linkedinUrl": "https://linkedin.com/in/johndoe",
  "githubUrl": "https://github.com/johndoe",
  "resumeUrl": "https://example.com/resume.pdf",
  "availability": "FULL_TIME",
  "expectedSalary": 70000,
  "skills": [
    {
      "name": "JavaScript",
      "proficiency": "ADVANCED",
      "yearsOfExperience": 3
    },
    {
      "name": "React",
      "proficiency": "INTERMEDIATE", 
      "yearsOfExperience": 2
    }
  ]
}

Upload Profile Picture
POST /api/v1/students/profile/picture
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
Form Data:
- file: [image file]

Skills Management Endpoints

Add Skill
POST /api/v1/students/skills
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Python",
  "proficiency": "INTERMEDIATE",
  "yearsOfExperience": 2,
  "certified": true
}

Update Skill
PUT /api/v1/students/skills/:skillId
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "proficiency": "ADVANCED",
  "yearsOfExperience": 3
}

Delete Skill
DELETE /api/v1/students/skills/:skillId
Authorization: Bearer <access_token>

Project Portfolio Endpoints

Add Project
POST /api/v1/students/projects
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "E-commerce Platform",
  "description": "Full-stack e-commerce application built with React and Node.js",
  "technologies": ["React", "Node.js", "MongoDB", "Express"],
  "startDate": "2023-01-15",
  "endDate": "2023-06-30",
  "githubUrl": "https://github.com/johndoe/ecommerce-platform",
  "liveUrl": "https://ecommerce-demo.com",
  "featured": true
}

Update Project
PUT /api/v1/students/projects/:projectId
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Updated E-commerce Platform",
  "description": "Enhanced full-stack e-commerce application with payment integration",
  "technologies": ["React", "Node.js", "MongoDB", "Express", "Stripe"]
}

Upload Project Images
POST /api/v1/students/projects/:projectId/images
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

Form Data:
- files: [image files]


Delete Project
DELETE /api/v1/students/projects/:projectId
Authorization: Bearer <access_token>


Achievement Endpoints

Add Achievement
POST /api/v1/students/achievements
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "AWS Certified Solutions Architect",
  "description": "Professional certification in AWS cloud architecture",
  "type": "CERTIFICATION",
  "issuer": "Amazon Web Services",
  "dateReceived": "2023-08-15",
  "credentialId": "AWS-CSA-2023-001",
  "credentialUrl": "https://aws.training/certification/verification"
}

Update Achievement
PUT /api/v1/students/achievements/:achievementId
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Updated AWS Certification",
  "description": "Updated certification details"
}

Delete Achievement
DELETE /api/v1/students/achievements/:achievementId
Authorization: Bearer <access_token>

Job Posting Endpoints (Employer)

Create Job Posting
POST /api/v1/jobs
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Junior Full Stack Developer",
  "description": "We are looking for a passionate junior developer to join our team",
  "requirements": [
    "Bachelor's degree in Computer Science or related field",
    "Proficiency in JavaScript, React, and Node.js",
    "Experience with Git and Agile methodologies"
  ],
  "responsibilities": [
    "Develop and maintain web applications using React and Node.js",
    "Collaborate with cross-functional teams to deliver high-quality software",
    "Participate in code reviews and contribute to technical discussions"
  ],
  "location": "New York, NY",
  "jobType": "FULL_TIME",
  "experienceLevel": "ENTRY_LEVEL",
  "salaryMin": 60000,
  "salaryMax": 80000,
  "skillsRequired": ["JavaScript", "React", "Node.js", "Git"],
  "applicationDeadline": "2024-03-15",
  "remoteWork": true
}

Get Job Postings
GET /api/v1/jobs?page=1&limit=10&location=New York&jobType=FULL_TIME&experienceLevel=ENTRY_LEVEL

Get Single Job Posting
GET /api/v1/jobs/:jobId

Update Job Posting
PUT /api/v1/jobs/:jobId
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Updated Junior Full Stack Developer",
  "salaryMax": 85000
}

Delete Job Posting
DELETE /api/v1/jobs/:jobId
Authorization: Bearer <access_token>

Job Application Endpoints

Apply for Job
POST /api/v1/jobs/:jobId/apply
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "coverLetter": "I am excited to apply for this position because...",
  "customResumeUrl": "https://example.com/custom-resume.pdf"
}

Get Applications (Student)
GET /api/v1/students/applications?status=PENDING&page=1&limit=10
Authorization: Bearer <access_token>

Get Applications for Job (Employer)
GET /api/v1/jobs/:jobId/applications?status=PENDING&page=1&limit=10
Authorization: Bearer <access_token>

Update Application Status (Employer)
PUT /api/v1/applications/:applicationId/status
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "status": "REVIEWED",
  "notes": "Strong candidate, moving to next round"
}

Search & Discovery Endpoints

Search Students (Employer)
GET /api/v1/students/search?skills=JavaScript,React&location=New York&graduationYear=2024&page=1&limit=10
Authorization: Bearer <access_token>

Search Jobs (Student)
GET /api/v1/jobs/search?q=developer&location=New York&jobType=FULL_TIME&remoteWork=true&page=1&limit=10
Authorization: Bearer <access_token>

Get Featured Students
GET /api/v1/students/featured?limit=10

Get Trending Skills
GET /api/v1/skills/trending?limit=20

Messaging Endpoints

Send Message
POST /api/v1/messages
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "recipientId": "recipient_user_id",
  "subject": "Regarding your profile",
  "content": "Hello! I'm interested in discussing potential opportunities with you."
}

Get Conversations
GET /api/v1/messages/conversations?page=1&limit=10
Authorization: Bearer <access_token>

Get Messages in Conversation
GET /api/v1/messages/conversations/:conversationId?page=1&limit=20
Authorization: Bearer <access_token>

Mark Message as Read
PUT /api/v1/messages/:messageId/read
Authorization: Bearer <access_token>

Admin Endpoints

Get Platform Statistics
GET /api/v1/admin/stats
Authorization: Bearer <admin_access_token>

Get All Users
GET /api/v1/admin/users?role=STUDENT&status=ACTIVE&page=1&limit=10
Authorization: Bearer <admin_access_token>

Update User Status
PUT /api/v1/admin/users/:userId/status
Authorization: Bearer <admin_access_token>
Content-Type: application/json

{
  "status": "SUSPENDED",
  "reason": "Violation of terms of service"
}

Get Pending Approvals
GET /api/v1/admin/approvals?type=PROFILE&status=PENDING&page=1&limit=10
Authorization: Bearer <admin_access_token>

Approve/Reject Content
PUT /api/v1/admin/approvals/:approvalId
Authorization: Bearer <admin_access_token>
Content-Type: application/json

{
  "status": "APPROVED",
  "notes": "Profile meets all requirements"
}

🗃️ Database Schema

Core Tables

Users
* id (UUID, Primary Key)
* email (String, Unique)
* password (String, Hashed)
* role (Enum: STUDENT, EMPLOYER, ADMIN)
* status (Enum: ACTIVE, SUSPENDED, PENDING)
* emailVerified (Boolean)
* createdAt (Timestamp)
* updatedAt (Timestamp)
Students
* id (UUID, Primary Key)
* userId (UUID, Foreign Key to Users)
* firstName (String)
* lastName (String)
* dateOfBirth (Date)
* university (String)
* major (String)
* graduationYear (Integer)
* gpa (Decimal, Optional)
* bio (Text)
* location (String)
* phoneNumber (String)
* website (String, Optional)
* linkedinUrl (String, Optional)
* githubUrl (String, Optional)
* profilePictureUrl (String, Optional)
* resumeUrl (String, Optional)
* availability (Enum: FULL_TIME, PART_TIME, INTERNSHIP, FREELANCE)
* expectedSalary (Integer, Optional)
* featured (Boolean, Default: false)
Employers
* id (UUID, Primary Key)
* userId (UUID, Foreign Key to Users)
* firstName (String)
* lastName (String)
* position (String)
* companyName (String)
* companyWebsite (String, Optional)
* companySize (String)
* phoneNumber (String)
* companyLogo (String, Optional)
* verified (Boolean, Default: false)
Skills
* id (UUID, Primary Key)
* studentId (UUID, Foreign Key to Students)
* name (String)
* proficiency (Enum: BEGINNER, INTERMEDIATE, ADVANCED, EXPERT)
* yearsOfExperience (Integer)
* certified (Boolean, Default: false)
Projects
* id (UUID, Primary Key)
* studentId (UUID, Foreign Key to Students)
* title (String)
* description (Text)
* technologies (Array of Strings)
* startDate (Date)
* endDate (Date, Optional)
* githubUrl (String, Optional)
* liveUrl (String, Optional)
* featured (Boolean, Default: false)
* images (Array of Strings, Optional)
Achievements
* id (UUID, Primary Key)
* studentId (UUID, Foreign Key to Students)
* title (String)
* description (Text)
* type (Enum: CERTIFICATION, AWARD, COMPETITION, ACADEMIC)
* issuer (String)
* dateReceived (Date)
* credentialId (String, Optional)
* credentialUrl (String, Optional)
Jobs
* id (UUID, Primary Key)
* employerId (UUID, Foreign Key to Employers)
* title (String)
* description (Text)
* requirements (Array of Strings)
* responsibilities (Array of Strings)
* location (String)
* jobType (Enum: FULL_TIME, PART_TIME, INTERNSHIP, CONTRACT, FREELANCE)
* experienceLevel (Enum: ENTRY_LEVEL, MID_LEVEL, SENIOR_LEVEL)
* salaryMin (Integer, Optional)
* salaryMax (Integer, Optional)
* skillsRequired (Array of Strings)
* applicationDeadline (Date, Optional)
* remoteWork (Boolean, Default: false)
* status (Enum: ACTIVE, EXPIRED, FILLED, PAUSED)
* createdAt (Timestamp)
* updatedAt (Timestamp)
Applications
* id (UUID, Primary Key)
* studentId (UUID, Foreign Key to Students)
* jobId (UUID, Foreign Key to Jobs)
* coverLetter (Text, Optional)
* customResumeUrl (String, Optional)
* status (Enum: PENDING, REVIEWED, INTERVIEWED, REJECTED, ACCEPTED)
* notes (Text, Optional)
* appliedAt (Timestamp)
* updatedAt (Timestamp)
Messages
* id (UUID, Primary Key)
* senderId (UUID, Foreign Key to Users)
* recipientId (UUID, Foreign Key to Users)
* conversationId (UUID)
* subject (String, Optional)
* content (Text)
* read (Boolean, Default: false)
* sentAt (Timestamp)

🧪 Testing

Running Tests
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch

Test Structure
src/
├── __tests__/
│   ├── unit/
│   │   ├── auth/
│   │   ├── students/
│   │   ├── employers/
│   │   └── jobs/
│   ├── integration/
│   └── e2e/

🚀 Deployment

Environment Variables for Production
NODE_ENV=production
DB_HOST=your_production_db_host
DB_SSL=true
JWT_SECRET=your_production_jwt_secret
CORS_ORIGIN=https://yourfrontend.com

Docker Deployment
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

Docker Compose
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: student_talent_hub
      POSTGRES_USER: username
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:

📚 Additional Resources

Development Tools
* Swagger UI: Available at http://localhost:3000/api/docs when running in development
* Database Migrations: Use TypeORM CLI for database schema changes
* API Testing: Postman collection available in /docs/postman/

Code Quality
* ESLint Configuration: Enforces coding standards
* Prettier: Automatic code formatting
* Husky: Git hooks for pre-commit validation
* Jest: Comprehensive testing framework

Security Features
* Rate Limiting: Prevents API abuse
* Input Validation: Validates all incoming data
* JWT Authentication: Secure token-based authentication
* Password Hashing: Using bcrypt for secure password storage
* CORS Protection: Configurable cross-origin request handling

🤝 Contributing
1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

Development Guidelines
* Follow the existing code style and conventions
* Write tests for new features
* Update documentation as needed
* Ensure all tests pass before submitting PR

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

📧 Support
For support and questions:
* Email: support@studenttalenthub.com
* GitHub Issues: Create an issue
* Documentation: Wiki

Made with ❤️ by Prosper Mapepa
