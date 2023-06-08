const axios = require('axios');
const CryptoJS = require('crypto-js');
const { KafkaClient, Producer } = require('kafka-node');
const dotenv = require('dotenv');

dotenv.config();

// Kafka configuration
const kafkaClient = new KafkaClient({ kafkaHost: process.env.KAFKA_HOST });
const kafkaProducer = new Producer(kafkaClient);

function generateClientCredentials(ocapiClientId, ocapiClientPassw) {
  const rawStr = CryptoJS.enc.Utf8.parse(`${ocapiClientId}:${ocapiClientPassw}`);
  const base64Encoded = CryptoJS.enc.Base64.stringify(rawStr);
  return base64Encoded;
}

const getClientAccessToken = async () => {
  const { data } = await axios.request({
    url: '/dwsso/oauth2/access_token',
    method: 'post',
    baseURL: 'https://account.demandware.com',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + generateClientCredentials(process.env.CLIENT_ID, process.env.CLIENT_PASSWORD),
    },
    data: {
      'grant_type': 'client_credentials',
    },
  });
  return data.access_token;
};

async function searchOrders(accessToken, shopId, currencyCode) {
  const JobExecutions = await axios.post(`${process.env.COMMERCE_CLOUD_HOST}/s/${shopId}/dw/shop/v23_2/order_search`,
    {
      'query': {
        'text_query': {
          'fields': [
            'created_by','currency_code'
          ],
          'search_phrase': currencyCode
        }
      },
      'select': '(**)',
      'sorts': [{ 'field': 'customer_name', 'sort_order': 'asc' }]
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'x-dw-client-id': process.env.CLIENT_ID,
      },
    }
  );

  return JobExecutions.data;
}

const util = require('util');

async function executeJob() {
  try {
    const accessToken = await getClientAccessToken();
    const shopId = 'RefArch';
    const email = 'example@example.com';
    const currencyCode = 'USD';

    const searchResults = await searchOrders(accessToken, shopId, currencyCode);
    console.dir(searchResults, { depth: null });

    // Process the search results here
    // Send results to Kafka
    
    const kafkaPayload = {
      topic: 'orders-topic', // Update with your desired Kafka topic name
      messages: searchResults,
    };
    kafkaProducer.send([kafkaPayload], (error, data) => {
      if (error) {
        console.error('Error sending data to Kafka:', error);
        process.exit(1);
      } else {
        console.log('Data sent to Kafka:', data);
        process.exit(0);
      }
    });

  } catch (error) {
    console.error('Error executing the job:', error);
  }
}

executeJob();
