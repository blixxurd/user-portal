# User Portal Express Server
Bootstrapped backend user management system.

## Required Environment Variables
  AUTH_KEY // Used to sign the JWT Token
  MONGO_URL // Your Mongo URL
  WEBSITE_URL // The public URL where this API lives
  MAILGUN_USER // SMTP Username for your mailgun account
  MAILGUN_PASS // SMTP password for your mailgun account
  NOTIFICATION_SENDER_NAME // The name to display on transactional emails
  NOTIFICATION_SENDER_ADDRESS // The email address that transactional email should be sent from
  NOTIFICATION_WEBSITE_NAME // The name of your website to show in transactional emails

## Database
For the sake of convenience, right now this application uses MongoDB exclusively.
- Mongoose is used as the ORM to interface with MongoDB
- We strongly reccomend using MongoDB Atlas for your database

### Prefab Database Models 
The database by default has a set of prefab models to aide with rapid setup of your user system. These models include. 

- Users
  - Handles user data that is exclusive to authentication like `password`, `username`, `email`, and `rights`
- Profiles
  - One for each user, linked by user ID. This is intended to house non-auth data. 
  - This model is intended to be extended based on project so that you can add more profile fields to your users
- Verifications
  - An escrow table of sorts for changes that require email verification
  - Convenient for things like password changes, email updates, and forgotten passwords 
  - Works hand in hand with the `NotificationsControllers`

## Concepts
- Strong MVC & Promise based architecture outside of the express app
- Controller Classes are used to handle as much logic as possible
- Error handling and response types should be as uniform as possible to make frontend dev easier
- As much logic as possible should remain out of the web server (express) to make it easy to switch

## Controllers
Controllers are primarily used to house large pieces of reusable logic. They follow an ES6 class structure. While intended to be extended, this app comes with a handful of prefab controllers to handle common scenarios and act as a foundation when setting up a new project. 

### Prefab Controllers

#### API Controller
Intended to be extended. This controller is built primarily to handle logic that occurs when a user requests an API route. In a perfect world, this will be the only controller loaded into your route files. 

#### UserController
Handles the creation, updating, modification, and everything else around the User and Profile models.

#### AuthController
Handles Authorization and Distribution of JWT tokens.

#### NotificationController 
Handles the email notification service. This controller houses functions that can send emails through Mailgun, and also compiles email-friendly HTML from the transactional mail templates found in the `Mail` folder. 

#### VerificationController 
Handles scenarios in which a user needs to verify an action through email. Works hand in hand with the NotificationController. By default, this controller handles three scenarios: 
- Forgot password
- Email change verification
- New account activation

## Helpers

Helpers are primarily used for enforcing formats, or for housing modules that don't necesarily need to belong in their own class. 

### Prefab Helpers

#### ErrorHandler
This helper enforces an error standard that is consistent across the app.

# Remaining Work
- Forgot Password Email
- Password Reset 
- Profile Field Updates
- Logger (Nice to have) 

