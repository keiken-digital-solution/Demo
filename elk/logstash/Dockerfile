ARG ELK_VERSION

# https://github.com/elastic/logstash-docker
FROM docker.elastic.co/logstash/logstash:${ELK_VERSION}

#COPY ./config/logstash.yml /usr/share/logstash/config/logstash.yml
COPY ./pipeline /usr/share/logstash/pipeline
COPY ./config/dwpatterns /usr/share/logstash/patterns/dwpatterns

# Add your logstash plugins setup here
# Example: RUN logstash-plugin install logstash-filter-json
#RUN logstash-plugin install logstash-input-beats
#RUN logstash-plugin install logstash-output-exec