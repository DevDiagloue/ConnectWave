import mongoose, {ConnectOptions} from 'mongoose'
import dotenv from 'dotenv'

const envFile =
    process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({
    path: envFile,
})

const MONGO_URL: string = process.env.MONGO_URL || ''
mongoose.set('strictQuery', false)

export const connectionDatabase = async () => {
    await mongoose
        .connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
            minPoolSize: 0,
        } as ConnectOptions)
        .then((res) => {
            console.log('Database Connected Successfuly.', res.connection.host)
        })
        .catch((err) => {
            console.log('Database connection error: ', err)
        })
}
