import { createClient } from 'redis';

export const clientConfiguration = {
  password: 'xtX00XlUOvxa1Pnhk3hbLbAInMBwabTO',
  socket: {
    host: 'redis-13903.c250.eu-central-1-1.ec2.redns.redis-cloud.com',
    port: 13903,
  },
};

export const scanRedisItem = async (matchString: string) => {
  // Create a Redis client
  // const client = createClient({
  //   url: 'localhost:6379',
  //   username: '',
  //   password: '',
  // });

  const client = createClient(clientConfiguration);
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
  const values = [];
  for await (const key of client.scanIterator({ MATCH: `${matchString}*` })) {
    values.push(await client.hGetAll(key));
  }
  await client.disconnect();
  return values;
};

export const getRedisItem = async (key: string) => {
  // Create a Redis client
  const client = createClient(clientConfiguration);
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
  const value = await client.get(key);
  await client.disconnect();
  return value;
};

export const storeJsonAsString = async function (key: string, data: any) {
  // Create a Redis client
  const client = createClient(clientConfiguration);
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
  await client.set(key, JSON.stringify(data));
  await client.disconnect();
};
