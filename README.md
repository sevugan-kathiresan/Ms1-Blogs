# Ms1-Blogs
The main aim of this project is to simulate the baisc working of the event-bus in a microservice based ecosystem. The project cosist of 6 major components.
1. client - Simple React frontend which lets users to create a blog post and create comments for the posts.
2. posts - A backend service which lets users to create a post
3. comments - Service responsible for creating comments
4. moderation  - Backend service responsible for comments moderation
5. query  - service repsonsible to snd data to the front end
6. event-bus - This module facilitates asynchronous communication between those services. This async communication is essential for the proper functionality of the app.

#### Example usecases for even-bus functionality
Context: As in general case every service in the microservices based architecture is encapsulated from one another. We would need a module or a program that facilitaes the comunication between those services. In our projects scope <br>
1. How the Query service knows whther a post or a comment is created ?
2. how does the query service and comments service know whther a comment is removed or accepted my the moderation service ?
3. What response should the query service send to frontend if the comment of interest is still under moderation?

These are all some of the questions this simple event-bus implementaion answers.

#### Folder Structure
<pre>
/MS1-Blogs
    /Blogs
        /client
        /comments
        /event-bus
        /moderation
        /posts
        /query
</pre>

#### Setup and Running the project
As This project is written using React (for frontend) and Node.js (for backend) the setup and run process is pretty similar for both frontend and backend. Don note that this project is mainly developed and tested for working in Linux and Windows (including WSL) environment. The following instrauction is mainly focussed for those two environments. <br>
<br>
Prerequisites: Node.js, npm (Node Package Manager) <br>
Installation instructions for Node and npm can be found here https://nodejs.org/en/download<br>
For WSL The instructions can be found here https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl

All You have to do is `cd` in to every folder (please follow the order as mentioned below in the note) and run the following commands<br>
`npm install`<br>
`npm start`<br>

Important Note: The services need to be setup and run in the following order
1. posts
2. comments
3. moderation
4. event-bus
5. query
6. client

