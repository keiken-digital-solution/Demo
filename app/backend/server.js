const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());



// Add Elasticsearch configuration and client initialization code
const { Client } = require('@elastic/elasticsearch');

const elasticsearchHost = process.env.ELASTICSEARCH_HOST || 'http://localhost:9200';

const client = new Client({ node: elasticsearchHost });

// Test the Elasticsearch connection
client.ping((err) => {
  if (err) {
    console.error('Elasticsearch cluster is down!');
  } else {
    console.log('Connected to Elasticsearch');
  }
});

// Add API endpoints
app.get('/api/data', async (req, res) => {
  try {
    const { body } = await client.search({
      index: 'orders-topic',
      body: {
        query: {
          match_all: {}
        }
      }
    });

    //console.dir(body, { depth: null });

    if (!body.hits || !body.hits.hits) {
      throw new Error('Invalid Elasticsearch response');
    }

    const data = body.hits.hits.map((hit) => hit._source);

    res.json(data);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const port = 5000; // 5173
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
