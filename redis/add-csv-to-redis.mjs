import { parse } from 'csv-parse';
import fs from 'fs';
import { createClient } from 'redis';

const addCsvToRedis = async () => {
  const csvFilePath = './redis/overall-historized-points.csv';

  const parser = parse({ columns: true }); // Parse into objects with column headers as keys
  const records = []; // Store parsed CSV data  (array of objects)
  fs.createReadStream(csvFilePath)
    .pipe(parser)
    .on('data', (row) => {
      records.push(row);
    })
    .on('end', () => {
      // Proceed to store data in Redis (see next step)
    });

  const redisClient = createClient();
  await redisClient.connect();

  // You have several options for storing the data:

  // Option 1: Store each row as a separate Redis Hash
  for (const record of records) {
    await redisClient.hSet(`overall-historized-points:${record.propId}:${record.id}`, record); // Assuming each row has a unique 'id'
  }

  // Option 2: Store all rows in a Redis List (as JSON strings)
  //await redisClient.rPush('overall-historized-points', records.map(JSON.stringify));

  // Option 3: Store data in RedisJSON format (if using Redis Stack)
  // Requires RedisJSON module: await redisClient.json.set('csv_data', '
};

addCsvToRedis().then(() => {
  console.log('Data stored in Redis');
});
