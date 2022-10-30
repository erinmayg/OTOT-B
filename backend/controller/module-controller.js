import axios from 'axios';
import redis from 'redis';
import 'dotenv/config';

const URI_AZURE = process.env.URI_AZURE;

let redisClient;

const setupRedis = async () => {
  redisClient = redis.createClient();
  redisClient.on('error', (error) => console.error(`Error : ${error}`));
  await redisClient.connect().then(() => console.log('Connected to Redis'));
};

setupRedis();

export const modules = async (req, res) => {
  const { AY } = req.query;

  let data;
  let isCached = false;

  try {
    const cacheResults = await redisClient.get(AY);

    if (cacheResults) {
      isCached = true;
      data = JSON.parse(cacheResults);
    } else {
      data = await axios
        .get(URI_AZURE, { params: req.query })
        .then(({ data }) => data);
      await redisClient.set(AY, JSON.stringify(data));
    }

    res.send({ isCached, data });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
