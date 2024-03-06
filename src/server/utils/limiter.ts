import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

export const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 5000,
});
