import { z } from 'zod'

const joinChannelValidationSchema = z.object({
  channelId: z.string().refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
    message: 'Invalid ObjectId',
  }),
})

export default joinChannelValidationSchema
