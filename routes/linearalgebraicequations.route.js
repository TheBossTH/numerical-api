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

const linearalgebraicequations_route = express.Router()
linearalgebraicequations_route.post('/cramer', (req, res) => Cramer(req, res))
linearalgebraicequations_route.post('/gausselimination', (req, res) =>
    GaussElimination(req, res),
)
linearalgebraicequations_route.post('/gaussjordan', (req, res) =>
    GaussJordan(req, res),
)
linearalgebraicequations_route.post('/ludecomposition', (req, res) =>
    LUdecomposition(req, res),
)
linearalgebraicequations_route.post('/jacobiiteration', (req, res) =>
    JacobiIteration(req, res),
)
linearalgebraicequations_route.post('/gaussseidel', (req, res) =>
    Gaussseidel(req, res),
)
linearalgebraicequations_route.post('/conjugategradient', (req, res) =>
    ConjugateGradient(req, res),
)

export default linearalgebraicequations_route
