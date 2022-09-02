
<h1 align="center">
  <br>
  International Student Travel Portal
  <br>
</h1>

<h4 align="center">An Online Platform to Encourage International University Students to Explore Scotland - <a href="http://www.istp-uoe.co.uk/" target="_blank">ISTP</a>.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#download">Download</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

![screenshot](https://github.com/RJOC/ISTP/blob/main/frontend/src/assets/img/bak.png?raw=true)

## Key Features

* Landing page 
    - Learn about the platform
    - Search for groups.
* Discover page 
    - Discover places to visit in Scotland recommended by the editor.
    - Propose a group trip.
* Groups page
    - Create a new group
    - Join an existing group
    - Search for existing groups
* Chat page
    - Search for international students to chat and plan a trip with.
    - Create groups to chat and plan a trip with.
    - Chat with individual people or groups.
    - Modify the created groups.
    - Leave a group.
    - Add someone to a group.
* Login page
    - Contains login functionality.
* Register page
    - Contains register functionality.
* Fully responsive platform
    - Automatically adapting to the screen regardless of size.


## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/RJOC/ISTP.git

# Go into the repository ISTP
$ cd ISTP

# Install dependencies
$ npm install

# Go into the repository frontend
$ cd frontend

# Install dependencies
$ npm install --legacy-peer-deps

# Run the frontend
$ npm start

# In a new terminal run the backend in ISTP directory
$ npm start


```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.


## Try the Online Platform

You can test out the platform here: <a href="http://www.istp-uoe.co.uk/" target="_blank">International Student Travel Portal</a>. 


## Credits

This software uses the following open source packages:

- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)
- [Expressjs](https://expressjs.com/)
- [React.js](https://reactjs.org/)
- [Cloudinary](https://cloudinary.com/)
- [Bootstrap](https://getbootstrap.com/)
- [ChakraUI](https://chakra-ui.com/)
- [Socket.IO](https://socket.io/)



## File Breakdown

* Frontend
    * build - generated
    * node_modules - generated 
    * public - generated
    * src
        * assets - fonts and images
        * components - collection of components for the body of each of the pages. They are called from the pages.
        * config
         - ChatLogics - some calculations for last messages and sender info
        * Context
          - ChatProvider.js - Manages chat state
        * pages
          - Chat.js - Chats page 
          - Groups.js - Groups page
          - Home.js - Landing backup
          - Inspire.js - Discover page
          - Login.js - Login page
          - NotFound.js - 404 page
          - Register.js - Register page
        - App.css - main style sheet
        - App.js - Landing page
        - index.css - fonts and some styles
        - index.js - Main broswer router housed here (Page redirection handler)
    - package-lock.json - package related
    - package.json - package related
    - README.md - generated
    * node_modules - generated
    - .env - environment variables
    - .gitignore - files that would not fit on github 
    - package-lock.json
    - package.json
    - Procfile - config for pointing to the backend/server.js file
    - readme.md -generated

* Backend
    * config
        - db.js - Database configuration
        - generateToken.js - Generating JWT Bearer token
    * controllers
        - chatControllers.js - MVC controller for chat
        - messageControllers.js - MVC controller for messages
        - userControllers.js - MVC controller for users
    * middleware
        - authMiddleware.js - JWT authorisation code
        - errorMiddleware.js - Error handling 
    * models
        - chatModel.js - MVC model for chat
        - messageModel.js - MVC model for messages
        - userModel.js - MVC model for users
    * Routes
        - chatRoutes.js - Routes for chat backend
        - messageRoutes.js - Routes for messages backend
        - userRoutes.js - Routes for user backend
    - server.js - Establishes path from working dir to build folder of frontend. Also handles socket.io connections and config.

## License

University of Edinburgh

---

> GitHub [@rjoc](https://github.com/RJOC) &nbsp;&middot;&nbsp;

