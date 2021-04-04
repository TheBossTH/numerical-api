import express from 'express'
import root_route from './routes/root.route.js'
import bodyParser from 'body-parser'
import cors from 'cors'
// import swaggerUi from 'swagger-ui-express'
// import swaggerDocument from './swagger-document'
const app = express()
const PORT = 8080

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use('/api/v1/users', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/root', root_route)

app.listen(PORT, () => {
    console.log(`server Start at port ${PORT}`)
})