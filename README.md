<p align="center"><b>Development of this project has been suspended indefinitely.</b></p>

# PhysIO - Backend
[![Build Status](https://travis-ci.com/travis-ci/travis-web.svg?branch=master)](https://travis-ci.com/travis-ci/travis-web)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

### THIS IS REST API BACKEND FOR [PHYSIO - FRONTEND](https://github.com/MaciejGL/final-project-frontend)

This project was created by [Maciej Glowacki](https://github.com/MaciejGL), [Stian Klasbu](https://github.com/mountwebs), and [Barbara Zujewska](https://github.com/b-zuj).

## What is PhysIO
PhysIO was our final project at the School of Applied Technology - we used 2 weeks to create an MVP that attempts to solve the covid-related issue. We chose to focus on the limited access to health care where due to lockdowns and physical contact restrictions many less urgent health issues are being overlooked. This is a big problem in physiotherapy where caretakers often send a list of exercises to their patients with at best a confusing illustration and a short description. Many patients have trouble following those instructions and as a result, their health suffers. This is why we decide to create PhysIO which allows physiotherapists to send their patients more customized workout plans with informative videos. 

At the current state, the app provides only the basic functionality. Given a chance we would like to implement additional features such as:
- expanding workout session/exercise customization and add session scheduling;
- add messaging functionality;
- implement remainders and notifications for clients.

## Tech/framework used
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Passport](http://www.passportjs.org/)
- [Mongoose](https://mongoosejs.com/)




## API routes

#### /auth

```
/signup - POST		require in body:  name, email, password
				returns: new Pro data + authorization token
        
/client/signup - POST	require in body:  name, email, password, pro id
				returns: new Client data + authorization token
        
/login - POST		require in body:  email, password
				returns:  Pro/Client data + authorization token
        
/login - GET		require authorization token
				returns: user data (for pros data is populated with client and session data

note: authentication required
```

	
#### /pros				
<i>note: authentication required for all pros paths</i>
```
/:id - GET			returns: pro data populated with clients data
/:id - PUT			requires in body: data to be updated
				returns: updated pro data
/:id - DELETE
```
#### /clients			
<i>note: authentication required for all clients paths</i>
```
/ - GET			available filter: pro id in query string
returns: all clients / all clients matching the filter value, populated with session data

/:id - GET			returns: client data populated with session data

/:id - PUT			requires in body: data to be updated
				returns: updated client data
        
/:id - DELETE		note: client id is deleted also from pro’s account clients’ list
```
#### /sessions			
<i> note: authentication required for all sessions paths</i>
```
/ - GET			available filter: pro id and/or client id in query string
returns: all sessions / all sessions matching the filter value populated with exercises data

/ - POST			required in body: title, description, client id, pro id
				returns: new session data
				note: doesn’t support adding exercises (??)
        
/:id - GET			returns: session data populated with exercise data

/:id - PUT			required in body: data to be updated, when adding an exercise it 
has to be added one at the time by sending exercise and comment in body
returns: updated session data populated with exercise data

/:id - DELETE		note: session id is deleted also from client’s account sessions’ list
```
#### /exercises			
<i>note: authentication required for all exercises paths</i>
```
/ - GET			available filter: pro id and title in query string
returns: all exercises / all exercises matching the filter values

/ - POST			required in body: title, description
required otherwise: user authentication token - pro id is extracted from token and added to the new exercise data 
				returns: new exercise data
        
/:id - GET			returns: exercise data

/:id - PUT			required in body: data to be updated
returns: updated exercise data

/:id - DELETE		note: exercise id is deleted also from session’s account exercises’
list
```
