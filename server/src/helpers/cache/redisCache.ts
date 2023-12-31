import { createClient } from 'redis'

export const initRedisClient = async () => {
  try {
    const client = createClient({
      url: process.env.REDIS_HOST,
    })
    await client.on('error', (error) =>
      console.log('Redis Client Connection Error', error),
    )
    await client.connect().then(() => console.log('Redis cache connected...'))
    return client
  } catch (error) {
    console.log('Redis app connection Error...', error)
  }
}
