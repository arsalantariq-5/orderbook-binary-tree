# orderbook-binary-tree## Introduction

## 1.DataBase

So in this repo .env.example has been added. Make sure you have .env in your project. After cloning run the following commands.


    1. npm install
    2. npm run dev

Now you server will be started. here Sequelize ORM is used and model is defined of order_book.

Secondly finding appropriate package for binary search was a hasle most of which i tried were not working. Still i got my own binary tree class which was generated by chat gpt and is not working.

Althought i have added all the logic which seems correct to me. It still needs some improvement but i donot want to spend too much time on it.

## 2.Sockets

In the project directory I have added a socket folder which contains a basic socket implementation. 

you can use this by opening terminal for socket folder

        node socket.js
    
Now you can call socket on whichever port you are running by 

        telnet localhost 9999
