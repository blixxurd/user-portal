# User Portal 


A boilerplate system for creating user based web apps and websites. Includes a server and client system out of the box, with the following functionality
- Registering Users
- User Authentication (Login)
- User Verification via Email
- Account Recovery via Email
- Notifications system
- User Profile Data

## [server](server)
Server implementation, written in NodeJS & Express.

## [client](client)
Client implementation, written in VueJS.

## Remaining Tasks for ideal MVP

**Server**
- Recovery entries should check or existing entry so that users can't pollute the table
- Re-send method for verifications

**Client**
- Form validation handler
- Resend Method for new account verification
- General Cleanup
- Error Code Translations
- Tailwind Style & Component Consolodation

## Mid Term Tasks for full Open Source Release
- Token Validation & Storage with HTTP-Only cookie, instead of LocalStorage
- Refresh Token functionality
- Return both an error code & a error message for API Errors 
