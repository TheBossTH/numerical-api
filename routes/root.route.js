import {
    Bisection,
    Falseposition,
    Newtonraphson,
    Onepoint,
    Secant,
} from '../contollers/RootsOfEquations.controller.js'
import {
    Cramer,
    GaussElimination,
    GaussJordan,
    LUdecomposition,
    JacobiIteration,
    Gaussseidel,
    ConjugateGradient,
} from '../contollers/LinearAlgebraicEquations.controller.js'
import express from 'express'

const root_route = express.Router()

root_route.post('/bisection', (req, res) => Bisection(req, res))
root_route.post('/falseposition', (req, res) => Falseposition(req, res))
root_route.post('/onepoint', (req, res) => Onepoint(req, res))
root_route.post('/newtonraphson', (req, res) => Newtonraphson(req, res))
root_route.post('/secant', (req, res) => Secant(req, res))
root_route.post('/cramer', (req, res) => Cramer(req, res))
root_route.post('/gausselimination', (req, res) => GaussElimination(req, res))
root_route.post('/gaussjordan', (req, res) => GaussJordan(req, res))
root_route.post('/ludecomposition', (req, res) => LUdecomposition(req, res))
root_route.post('/jacobiiteration', (req, res) => JacobiIteration(req, res))
root_route.post('/gaussseidel', (req, res) => Gaussseidel(req, res))
root_route.post('/conjugategradient', (req, res) => ConjugateGradient(req, res))

export default root_route
