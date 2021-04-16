import {
    Newtondivided,
    Lagrangepolynomials,
    Splineinterpolation,
} from '../contollers/InterpolationandExtrapolation.controller.js'
import express from 'express'

const interpolationandextrapolation_route = express.Router()

interpolationandextrapolation_route.post('/newtondivided', (req, res) =>
    Newtondivided(req, res),
)
interpolationandextrapolation_route.post('/lagrangepolynomials', (req, res) =>
    Lagrangepolynomials(req, res),
)
interpolationandextrapolation_route.post('/splineinterpolation', (req, res) =>
    Splineinterpolation(req, res),
)
export default interpolationandextrapolation_route
