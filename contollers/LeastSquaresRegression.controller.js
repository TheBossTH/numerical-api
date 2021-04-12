/**
 *
 * @param {import("express").Request} req
 * @param {import('express').Response} res
 */
import regressions from 'regression'

export const LinearRegression = (req, res) => {
    const data = req.body
    let x = []
    let y = []
    let datas = []
    for (const key in data.x) {
        x.push(data.x[key])
    }
    for (const key in data.y) {
        y.push(data.y[key])
    }
    x.map((r, i) => {
        datas.push([x[i], y[i]])
    })
    const linear = regressions.linear(datas)
    res.json({
        data: linear,
        ans: linear.predict(data.prediction),
    })
}

export const PolynomialRegression = (req, res) => {
    const data = req.body
    let x = []
    let y = []
    let datas = []
    for (const key in data.x) {
        x.push(data.x[key])
    }
    for (const key in data.y) {
        y.push(data.y[key])
    }
    x.map((r, i) => {
        datas.push([x[i], y[i]])
    })
    const poly = regressions.polynomial(datas, { order: data.order })
    res.json({ data: poly, ans: poly.equation })
}

export default {
    LinearRegression,
    PolynomialRegression,
}
