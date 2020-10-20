# User Portal 


A boilerplate system for creating user based web apps and websites. Includes a server and client system out of the box, with the following functionality
- Registering Users
- User Authentication (Login)
- User Verification via Email
- Account Recovery via Email
- Notifications system

## [server](server)
Server implementation, written in NodeJS & Express.

## [client](client)
Client implementation, written in VueJS.

## Remaining Tasks for ideal MVP

**Server**
- Server side verification of fields existing for login.
- Recovery entries should check or existing entry so that users can't pollute the table
- Throw 401 error for CORS
- Verify that all client errors are
- Re-send method for verifications

**Client**
- Form validation handler
- Token saving
- Authenticated POST in API Controller
- Profile Editing
- Resend Method for new account verification

## Mid Term Tasks for full Open Source Release
- Token Validation & Storage with HTTP-Only cookie, instead of LocalStorage
- Refresh Token functionality
- Return both an error code & a error message for API Errors 
