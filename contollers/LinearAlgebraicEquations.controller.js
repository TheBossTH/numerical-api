/**
 *
 * @param {import("express").Request} req
 * @param {import('express').Response} res
 */
import { det, round, lusolve, add, subtract, multiply, transpose } from 'mathjs'
import rref from 'rref'
import linSystem from 'linear-equation-system'

export const Cramer = (req, res) => {
    const data = req.body
    let result = []
    const m = [
        [data.a11, data.a12, data.a13],
        [data.a21, data.a22, data.a23],
        [data.a31, data.a32, data.a33],
    ]
    const b = [data.b1, data.b2, data.b3]

    const cal = (i, j) => {
        const a1 = [
            [data.a11, data.a12, data.a13],
            [data.a21, data.a22, data.a23],
            [data.a31, data.a32, data.a33],
        ]
        while (i < b.length) {
            a1[i][j] = b[i]
            i++
        }
        return det(a1) / det(m)
    }
    for (let i = 0; i < m.length; i++) {
        let value = round(cal(0, i))
        result.push({ x: i + 1, value })
    }
    res.json({
        data: result,
    })
}

export const GaussElimination = (req, res) => {
    const data = req.body
    let result = []
    const x = rref([
        [data.a11, data.a12, data.a13, data.b1],
        [data.a21, data.a22, data.a23, data.b2],
        [data.a31, data.a32, data.a33, data.b3],
    ])

    for (let i = 0; i < x.length; i++) {
        let value = round(x[i][x.length])
        result.push({ xi: i + 1, value })
    }
    res.json({
        data: result,
    })
}

export const GaussJordan = (req, res) => {
    const data = req.body
    let result = []
    const a = [
        [data.a11, data.a12, data.a13],
        [data.a21, data.a22, data.a23],
        [data.a31, data.a32, data.a33],
    ]
    const b = [data.b1, data.b2, data.b3]
    let x = round(linSystem.solve(a, b))
    for (let i = 0; i < x.length; i++) {
        result.push({ xi: i + 1, value: x[i] })
    }
    res.json({
        data: result,
    })
}

export const LUdecomposition = (req, res) => {
    const data = req.body
    let result = []
    const a = [
        [data.a11, data.a12, data.a13],
        [data.a21, data.a22, data.a23],
        [data.a31, data.a32, data.a33],
    ]
    const b = [data.b1, data.b2, data.b3]
    const ans = lusolve(a, b)
    let x = round(ans)
    for (let i = 0; i < x.length; i++) {
        result.push({ xi: i + 1, value: x[i][0] })
    }
    res.json({
        data: result,
    })
}

export const JacobiIteration = (req, res) => {
    const data = req.body
    let result = []
    var i = 1,
        erx1 = 1,
        erx2 = 1,
        erx3 = 1,
        x1,
        x2,
        x3
    const a = [
        [data.a11, data.a12, data.a13],
        [data.a21, data.a22, data.a23],
        [data.a31, data.a32, data.a33],
    ]
    const b = [data.b1, data.b2, data.b3]
    let x1before = data.x1,
        x2before = data.x2,
        x3before = data.x3
    while (erx1 > 0.000001 && erx2 > 0.000001 && erx3 > 0.000001) {
        x1 = parseFloat(
            (
                (b[0] - a[0][1] * x2before - a[0][2] * x3before) /
                a[0][0]
            ).toFixed(6),
        )
        x2 = parseFloat(
            (
                (b[1] - a[1][0] * x1before - a[1][2] * x3before) /
                a[1][1]
            ).toFixed(6),
        )
        x3 = parseFloat(
            (
                (b[2] - a[2][0] * x1before - a[2][1] * x2before) /
                a[2][2]
            ).toFixed(6),
        )
        erx1 = Math.abs(parseFloat((x1 - x1before) / x1).toFixed(6))
        erx2 = Math.abs(parseFloat((x2 - x2before) / x2).toFixed(6))
        erx3 = Math.abs(parseFloat((x3 - x3before) / x3).toFixed(6))
        result.push({ iteration: i, x1, x2, x3, erx1, erx2, erx3 })
        x1before = x1
        x2before = x2
        x3before = x3
        i++
    }
    res.json({
        data: result,
    })
}

export const Gaussseidel = (req, res) => {
    const data = req.body
    let result = []
    var i = 1,
        erx1 = 1,
        erx2 = 1,
        erx3 = 1,
        x1,
        x2,
        x3
    const a = [
        [data.a11, data.a12, data.a13],
        [data.a21, data.a22, data.a23],
        [data.a31, data.a32, data.a33],
    ]
    const b = [data.b1, data.b2, data.b3]
    let x1before = data.x1,
        x2before = data.x2,
        x3before = data.x3
    while (erx1 > 0.000001 && erx2 > 0.000001 && erx3 > 0.000001) {
        x1 = parseFloat(
            (
                (b[0] - a[0][1] * x2before - a[0][2] * x3before) /
                a[0][0]
            ).toFixed(6),
        )
        x2 = parseFloat(
            ((b[1] - a[1][0] * x1 - a[1][2] * x3before) / a[1][1]).toFixed(6),
        )
        x3 = parseFloat(
            ((b[2] - a[2][0] * x1 - a[2][1] * x2) / a[2][2]).toFixed(6),
        )
        erx1 = Math.abs(parseFloat((x1 - x1before) / x1).toFixed(6))
        erx2 = Math.abs(parseFloat((x2 - x2before) / x2).toFixed(6))
        erx3 = Math.abs(parseFloat((x3 - x3before) / x3).toFixed(6))
        result.push({ iteration: i, x1, x2, x3, erx1, erx2, erx3 })
        x1before = x1
        x2before = x2
        x3before = x3
        i++
    }
    res.json({
        data: result,
    })
}

export const ConjugateGradient = (req, res) => {
    const data = req.body
    let result = []
    const A = [
        [data.a11, data.a12, data.a13],
        [data.a21, data.a22, data.a23],
        [data.a31, data.a32, data.a33],
    ]
    const B = [data.b1, data.b2, data.b3]
    let x = [data.x1, data.x2, data.x3]
    var R = subtract(multiply(A, x), B)
    var D = multiply(R, -1)
    let err = 1
    let iter = 1
    while (err > 0.000001) {
        var l =
            multiply(multiply(transpose(D), R), -1) /
            multiply(multiply(transpose(D), A), D)
        x = add(x, multiply(l, D))
        R = subtract(multiply(A, x), B)
        err = Math.sqrt(multiply(transpose(R), R)).toFixed(8)
        console.log('Error = ', err)
        var a1 =
            multiply(multiply(transpose(R), A), D) /
            multiply(transpose(D), multiply(A, D)).toFixed(8)
        console.log('a', iter - 1, ' = ', a1)
        D = add(multiply(R, -1), multiply(a1, D))
        console.log('D', iter, ' = ', D)
        result.push({
            iteration: iter,
            l,
            x1: x[0],
            x2: x[1],
            x3: x[2],
            r1: R[0],
            r2: R[1],
            r3: R[2],
            err,
            a1,
            d1: D[0],
            d2: D[1],
            d3: D[2],
        })
        iter++
    }

    res.json({
        data: result,
    })
}

export default {
    Cramer,
    GaussElimination,
    GaussJordan,
    LUdecomposition,
    JacobiIteration,
    Gaussseidel,
    ConjugateGradient,
}
