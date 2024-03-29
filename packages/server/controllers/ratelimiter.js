import redisClient from '../redis.js';

const rateLimiter = (secondsLimit, limitAmount) => async (req, res, next) => {
  const ip = req.connection.remoteAddress.split(':').at(-1);
  const [response] = await redisClient.multi().incr(ip).expire(ip, secondsLimit).exec();

  console.log(response[1]);

  if (response[1] > limitAmount) {
    res.json({
      loggedIn: false,
      status: 'Slow down!! Try again in a minute.',
    });
  } else {
    next();
  }
};

export { rateLimiter };
