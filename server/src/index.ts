import app from './app'
import { connectionDatabase } from './databases/connectionDatabase'

const APP_PORT = process.env.PORT || 3000

app.listen(APP_PORT, () => {
  connectionDatabase()
  console.log(`Listening: http://localhost:${APP_PORT}`)
})
