import app from './app'
import { connectionDatabase } from './databases/connectionDatabase'

const APP_PORT = process.env.APP_PORT || 3000

app.listen(APP_PORT, () => {
  try {
    connectionDatabase()
    console.log(`Listening: http://localhost:${APP_PORT}`)
  } catch (error: any) {
    console.log(error.message)
  }
})
 