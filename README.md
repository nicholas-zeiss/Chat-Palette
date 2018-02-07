# Chat-Palette

Chat-Pallete is a messaging app that allows you to paint every message with a different color. You can then select which color messages you would like to be displayed so that you can have multi-threaded conversations.

Create an account then log in to chat with your cyber friends! Before you post a message be sure to choose a color.


## Installation

All you need to do to get this site up and running on a local is a few simple commands:
```
 $ git clone https://github.com/nicholas-zeiss/Chat-Palette.git
 $ cd Chat-Palette/
 $ mkdir app/server/data
 $ npm i
 $ npm start
```
That's it! Chat-Palette will now be running on your localhost at port 8080.


## Implementation

Stack: AngularJS, Express, Socket.IO, SQL w/ Bookshelf.js

User information and messages are stored on the backend using Bookshelf, which implements a table for each. A successful login will return a JWT, which is stored in session storage allowing you to reload the page without having to login again. Once logged in the site uses that JWT to connect to the Socket.IO server; attempts to connect to the socket with an invalid token will force you back to the login page. Once connected, the socket will update your page in real time with messages created by others and will allow you to send your own back.
