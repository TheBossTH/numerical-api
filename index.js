import express from 'express'
import root_route from './routes/root.route.js'
import linearalgebraicequations_route from './routes/linearalgebraicequations.route.js'
import leastsquaresregression_route from './routes/leastsquaresregression.route.js'
import interpolationandextrapolation_route from './routes/interpolationandextrapolation.route.js'
import bodyParser from 'body-parser'
import cors from 'cors'

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const swaggerDocument = require('./swagger.json')
import swaggerUi from 'swagger-ui-express'

const app = express()
const PORT = 8080

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explorer: true }),
)

app.use('/api/v1/root', root_route)

app.use('/api/v1/linearalgebraicequations', linearalgebraicequations_route)

app.use('/api/v1/leastsquaresregression', leastsquaresregression_route)

app.use(
    '/api/v1/interpolationandextrapolation',
    interpolationandextrapolation_route,
)

app.listen(PORT, () => {
    console.log(`server Start at port ${PORT}`)
})
