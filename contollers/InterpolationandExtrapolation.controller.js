/**
 *
 * @param {import("express").Request} req
 * @param {import('express').Response} res
 */
import Spline from 'cubic-spline'

export const Newtondivided = (req, res) => {
    const data = req.body
    let xi = []
    let yi = []
    let input = [] //input inxi
    for (const key in data.x) {
        xi.push(data.x[key])
    }
    for (const key in data.y) {
        yi.push(data.y[key])
    }
    let x = [],
        fx = []
    let push = () => {
        ;(x = []), (fx = [])
        input = input.map((value) => value - 1)
        input.map((value) => {
            x.push(xi[value])
            fx.push(yi[value])
        })
    }
    let Equation = (i, j) => {
        if (i == j) {
            return fx[i]
        } else if (Math.abs(j - i) == 1) {
            return (fx[j] - fx[i]) / (x[j] - x[i])
        } else {
            return (Equation(i + 1, j) - Equation(i, j - 1)) / (x[j] - x[i])
        }
    }
    let Result = (find) => {
        let sum = 0
        for (let i = 0; i < x.length; i++) {
            let temp = Equation(0, i)
            for (let j = 0; j < i; j++) {
                temp *= find - x[j]
            }
            sum += temp
        }
        return sum
    }
    for (const key in data.index) {
        input.push(data.index[key])
    }
    push()
    let ans = Result(data.fx)
    res.json({ ans })
}

export const Lagrangepolynomials = (req, res) => {
    const data = req.body
    let x = []
    let y = []
    for (const key in data.x) {
        x.push(data.x[key])
    }
    for (const key in data.y) {
        y.push(data.y[key])
    }
    let fx = data.fx
    let p
    let n = x.length
    let yp = 0

    for (let i = 0; i < n; i++) {
        p = 1
        for (let j = 0; j < n; j++) {
            if (i != j) {
                p = p * ((fx - x[j]) / (x[i] - x[j]))
            }
        }
        yp = yp + p * y[i]
    }
    let ans = parseFloat(yp.toFixed(4))
    res.json({ ans })
}

export const Splineinterpolation = (req, res) => {
    const data = req.body
    let x = []
    let xi = data.xi
    let y = []
    let result = []
    for (const key in data.x) {
        x.push(data.x[key])
    }
    for (const key in data.y) {
        y.push(data.y[key])
    }
    const spline = new Spline(x, y)
    res.json({ result: spline.at(xi) })
}

export default { Newtondivided, Lagrangepolynomials }
