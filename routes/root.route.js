import {
    Bisection,
    Falseposition,
    Newtonraphson,
    Onepoint,
    Secant,
} from '../contollers/RootsOfEquations.controller.js'
import express from 'express'

const root_route = express.Router()

root_route.post('/bisection', (req, res) => Bisection(req, res))
root_route.post('/falseposition', (req, res) => Falseposition(req, res))
root_route.post('/onepoint', (req, res) => Onepoint(req, res))
root_route.post('/newtonraphson', (req, res) => Newtonraphson(req, res))
root_route.post('/secant', (req, res) => Secant(req, res))

export default root_route
