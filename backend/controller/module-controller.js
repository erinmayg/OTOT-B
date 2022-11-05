import redis from 'redis';
import 'dotenv/config';
import NUSMods from '../models/module-model.js';

let redisClient;

const setupRedis = async () => {
  redisClient = redis.createClient();
  redisClient.on('error', (error) => console.error(`Error : ${error}`));
  await redisClient.connect().then(() => console.log('Connected to Redis'));
};

setupRedis();

export const modules = async (req, res) => {
  const { AY } = req.params;

  let data;
  let isCached = false;

  try {
    const cacheResults = await redisClient.get(AY);

    if (cacheResults) {
      isCached = true;
      data = JSON.parse(cacheResults);
      return res.send({ isCached, data });
    }

    NUSMods.findOne({ AY }, async (err, { modules }) => {
      if (err) return res.send({ message: err });
      await redisClient.set(AY, JSON.stringify(modules));
      res.send({ isCached, data: modules });
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
