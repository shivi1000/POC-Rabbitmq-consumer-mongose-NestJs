# POC - Rabbit mq Microservice BoilerPlate Using Nest js with Mongoose ODM

The POC-Rabbitmq-consumer-mongoOse-NestJs serves as a proof of concept, illustrating the integration of NestJS, RabbitMQ, and MongoDB. It highlights NestJS for developing modern Node.js applications, RabbitMQ for dependable asynchronous communication, and MongoDB for adaptable and scalable data storage. The project includes the RabbitMQ Consumer component, tasked with handling API requests or initiating events.

## Installation

1. Clone the repository:


```bash
git clone https://github.com/shivi1000/POC-Rabbitmq-consumer-mongose-NestJs.git

```

## Branch Switch

1. Switch to dev branch:

```bash
git checkout dev

```


## 1.1 Project Structure

- **src:** Source code of the POC-Rabbit MQ-Consumer-Mongoose-Nest js


## Installation

- Install dependencies:

```bash
npm install

```


## 1.2 Environment Setup

- Create bin folder in root directory

```bash
mkdir bin

```

- Create a file named

```bash
.env.dev

```


## Base configuration

```bash
PORT=8009           //replace with your NestJS port

```


## MONGO DB

```bash
URI=''              //add your mongodb database url

```

## RABBIT MQ

```bash
RABBIT_MQ_QUEUE=''         //add your rabbit mq queue
RABBIT_MQ_HOST=''          //add your rabbit mq host
RABBIT_MQ_PORT=5672

```


## 1.3 Start the Project

- Start the service:

```bash
npm run dev

```


