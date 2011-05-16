# Express MVC Bootstrap

A MVC boilerplate for Express.js

## Description

I built this application to create a template MVC `style` app that I could then use as the start point for further development. I used the excellent examples in the main [Express github repository](https://github.com/visionmedia/express), specifically the MVC example, as the starting point. I have however changed it quite substantially to make it clearer and remove some of the `magic` that confused me at first when learning. If you are familiar with other MVC frameworks hopefully my file structure makes some sense.

## Requires

### You need to manually install: 

  - [Node.js](http://nodejs.org/): Amazing javascript asynchronous IO library, install manually.
  - [MongoDB](http://www.mongodb.org): NoSQL Database, install manually.
  - [NPM](http://npmjs.org/): Node package manager, used to install the remaining.

### And then install via NPM: 

  - [Express](http://expressjs.com/): Application Framework for Node.js
  - [Mongoose](http://mongoosejs.com/): Node.JS ORM for Mongo
  - [ejs](http://embeddedjs.com/): EmbeddedJS Templating
  - [cluster](http://learnboost.github.com/cluster): extensible multi-core server manager
  - log: Tiny logger with streaming reader
  - [connect](https://github.com/senchalabs/connect): High performance middleware framework
  - mime: A comprehensive library for mime-type mapping
  - qs: querystring parser
  - [expresso](https://github.com/visionmedia/expresso): TDD framework, light-weight, fast, CI-friendly
  - should: test framework agnostic BDD-style assertions
  - [socket.io](https://github.com/learnboost/Socket.IO-node): The cross-browser WebSocket

### But I've included in this project:

  - [jQuery](http://jquery.com/): Javascript Library
  - [jQuery UI](http://jqueryui.com/): UI Library
  - [jQuery Aristo Template](http://taitems.tumblr.com/post/482577430/introducing-aristo-a-jquery-ui-theme): Fantastic looking jQuery UI Template.

## Installation

  - Install node.js 

<!---->

      // on osx with brew
      brew update
      brew install node
    
      // build from source
      git clone git://github.com/joyent/node.git
      ./configure
      make
      make install
  
  - Ininstall mongodb
  
<!---->

      // on osx with brew
      brew update
      brew install mongodb
    
      // create db folder
      mkdir -p /usr/local/db/

> For more installation detail please see [this](http://www.mongodb.org/display/DOCS/Quickstart)
    
  - Install npm

<!---->

    curl http://npmjs.org/install.sh | clean=no sh
    
  - Install required packages

<!---->
    
      // install executable package globally
      npm install express-mvc-bootstrap -g
    
      // make project folder and go to that folder
      mkdir /path/to/project
      cd /path/to/project
    
      // install packages locally to be `require();`
      npm install socket.io should mongoose log cluster expresso qs mime ejs connect express express-mvc-bootstrap

## Setup
  - In you project folder run
  
<!---->

      // create app 
      eb create-app
    
      // running mongodb
      mongod --dbpath /usr/local/db/
    
      // running server
      eb
    
  - Browse to http://localhost:3000


## Commands:
    
      // Shows help
      eb script
    
      // Wrapper for 3 commands below
      eb script generate-all HelloWorld
    
      // Creates a model
      eb script create-model HelloWorld 
    
      // Creates a controller
      eb script create-controller HelloWorld
    
      // Creates views
      eb script create-view HelloWorld
    
      // Creates tests
      eb script create-test HelloWorld
    
      // Runs server on different port
      eb server server.port=3000
    
      // Creates a new app
      eb create-app

## TODO: 
Build some amazing apps!
