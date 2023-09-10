import { z } from 'zod'

const createChannelValidationSchema = z.object({
  channelName: z.string().min(3).max(50),
  channelDescription: z.string().min(3).max(100),
  channelType: z.union([z.literal('public'), z.literal('private')]),
})

export default createChannelValidationSchema
