## Section 14: Sending Http Requests (e.g. Connecting to a Database)

---

## -- Video 172 : Module Intro

What we will learn in this module:

- connecting a backend And Database
- Sending HTTP Requests
- How do React Apps Interact with the Backend and database
- Sending HTTP Requests and using responses
- Handling Errors And loading states

---

## -- Video 173 : How to (NOT) connect to a database

- browser side apps dont directly talk to a database
- it is very bad practice to connect to a database from the browser directly
- the browser is not a secure environment to talk to a database as anyone can see the requests
- database credentials may be exposed as whole js code is visible to each user of a website
- you must have a backend to talk to the database using apis and http requests from the browser it could be any backend language like php, python, nodejs, java, etc
