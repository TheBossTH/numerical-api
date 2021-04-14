import {
    Newtondivided,
    Lagrangepolynomials,
} from '../contollers/InterpolationandExtrapolation.controller.js'
import express from 'express'

const interpolationandextrapolation_route = express.Router()

interpolationandextrapolation_route.post('/newtondivided', (req, res) =>
    Newtondivided(req, res),
)
interpolationandextrapolation_route.post('/lagrangepolynomials', (req, res) =>
    Lagrangepolynomials(req, res),
)
export default interpolationandextrapolation_route
