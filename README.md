# Project Name

This Demo includes Elasticsearch, Kibana, Logstash, Kafka, a backend server, and a frontend application.

## Getting Started

Follow the steps below to set up and run the project.

### Prerequisites

- Docker
- Node.js

### Installation

1. Clone the repository:

   ```bash
   git clone https://gitlab.com/K-Oussama/demo.git

2. Navigate to the elk folder:

    ```bash
    cd elk

3. Start the Elasticsearch, Kibana, and Logstash containers using Docker Compose:

    ```bash
    docker-compose up -d

4. Navigate to the kafka_setup folder and Run the Kafka Docker Compose configuration file to set up Kafka:

    ```bash
    cd ..
    cd kafka_setup
    docker-compose -f kafka-docker-compose.yaml up -d

5. Navigate to the backend folder and Start the frontend

    ```bash
    cd ..
    cd backend
    npm install
    npm run start

6. Navigate to the frontend folder

    ```bash
    cd ..
    cd frontend
    npm install
    npm run dev

7. Open your browser and access the application at `http://127.0.0.1:5173`

## Additional Information

- The kafka-manager is available at `http://localhost:9000`.
- The Elasticsearch instance is available at `http://localhost:9200`.
- The Kibana interface is accessible at `http://localhost:5601`.
- The backend server runs on `http://localhost:5000/api/data`.
- The frontend server runs on `http://127.0.0.1:5173`.

