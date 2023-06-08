FROM wurstmeister/kafka

# Any additional configurations or modifications

# Copy the modified server.properties file
COPY server.properties /opt/kafka/config/server.properties

# Create the "my-cluster" and "orders-topic" during container startup

#COPY create-topics.sh /create-topics.sh
#RUN chmod +x /create-topics.sh
#CMD ["sh", "-c", "/create-topics.sh"]