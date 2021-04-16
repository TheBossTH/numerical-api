import {
    LinearRegression,
    PolynomialRegression,
    MultipleLinearRegression,
} from '../contollers/LeastSquaresRegression.controller.js'
import express from 'express'

const leastsquaresregression_route = express.Router()

leastsquaresregression_route.post('/linearregression', (req, res) =>
    LinearRegression(req, res),
)
leastsquaresregression_route.post('/polynomialregression', (req, res) =>
    PolynomialRegression(req, res),
)
leastsquaresregression_route.post('/multipleLinearregression', (req, res) =>
    MultipleLinearRegression(req, res),
)
export default leastsquaresregression_route
