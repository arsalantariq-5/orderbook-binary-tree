# orderbook-binary-tree## Introduction

## 1.DataBase

So in this repo .env.example has been added. Make sure you have .env in your project. After cloning run the following commands.


    1. npm install
    2. npm run dev

Now you server will be started. here Sequelize ORM is used and model is defined of order_book.

Assuming the orders data like this which is in json

  {
  "orders": [
    {
      "side": "buy",
      "price": 12.3
    },
    {
      "side": "sell",
      "price": 12.3
    }
  ]
}


Here is the curl command for postman

    curl --location --request POST 'http://localhost:3000/orders' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "orders": [
        {
          "side": "buy",
          "price": 12.3
        },
        {
          "side": "sell",
          "price": 12.3
        }
      ]
    }
    '

Secondly finding appropriate package for binary search was a hasle most of which i tried few that were not working.

So added binaryTree class

## 2.Sockets

In the project directory I have added a socket folder which contains a basic socket-client implementation. 

you can use this by opening terminal for socket folder

        node socket-client.js
    
Now you can open http://localhost:3000/socket-client.html and recieve messages as i have added screenshot in solution images

Note:
1. your server should be running 
2. your client should be running

## 3.Redis

Redis file exist in redis directory and is integrated with index file at root.

redis server should be running. Run following command

      redis-server

you can check if redis is running by this command

      redis-cli -h localhost -p 6379 ping

4. Docker

Docker file is added in the project use following commands to run docker file. Docker should be installed on your system or server

To build

      docker build -t orderbook-binary-tree . 

To run

      docker run -p 3000:3000 orderbook-binary-tree 


