/**
 *
 * @param {import("express").Request} req
 * @param {import('express').Response} res
 */
import { derivative, simplify, evaluate } from 'mathjs'

export const Bisection = (req, res) => {
    const data = req.body
    let xl = data.xl
    let xr = data.xr
    let i = 0
    let er = 1
    let er1 = data.error
    if (er1 == null || er1 <= 0) {
        er1 = 0.000001
    }
    let xm, xmbefore
    let result = []
    let fx = (x) => {
        let a = simplify(data.eq).toString()
        return evaluate(a, { x })
    }
    while (er > er1) {
        //step1
        xm = (xl + xr) / 2
        //step2
        let check = fx(xm) * fx(xr)
        //step3
        if (check < 0) {
            //step4
            if (i > 0) {
                er = parseFloat(Math.abs((xm - xmbefore) / xm).toFixed(6))
            }
            xl = xm
            xmbefore = xm
        } else {
            //step4
            if (i > 0) {
                er = parseFloat(Math.abs((xm - xmbefore) / xm).toFixed(6))
            }
            xr = xm
            xmbefore = xm
        }
        result.push({
            iteration: i,
            xl,
            xr,
            xm,
            er,
        })
        i++
    }
    res.json({
        data: result,
    })
}

export const Falseposition = (req, res) => {
    const data = req.body
    let result = []
    let i = 0
    let xl = data.xl
    let xr = data.xr
    let f = 0
    let x1 = 0.5
    let er = 1
    let er1 = data.error
    if (er1 == null || er1 <= 0) {
        er1 = 0.000001
    }
    let fx = (x) => {
        let a = simplify(data.eq).toString()
        return evaluate(a, { x })
    }
    while (er > er1) {
        x1 = (xl * fx(xr) - xr * fx(xl)) / (fx(xr) - fx(xl))
        f = x1 * fx(xr)
        if (i == 0) {
            if (f < 0) {
                xl = x1
            } else {
                xr = x1
            }
        } else {
            if (f < 0) {
                er = parseFloat(Math.abs((x1 - xl) / x1).toFixed(5))

                xl = x1
            } else {
                er = parseFloat(Math.abs((x1 - xr) / x1).toFixed(5))
                xr = x1
            }
        }
        if (i > 0) {
            result.push({ iteration: i, xl, xr, x1, er })
        }
        i++
    }
    res.json({
        data: result,
    })
}

export const Newtonraphson = (req, res) => {
    const data = req.body
    let result = []
    let x = data.x
    let i = 0
    let xi, fx1, fx2
    let er = 1
    let er1 = data.error
    if (er1 == null || er1 <= 0) {
        er1 = 0.000001
    }
    let fx = (x) => {
        let a = simplify(data.eq).toString()
        return evaluate(a, { x })
    }
    let diffx = (x) => {
        let b = derivative(data.eq, 'x').toString()
        b = simplify(b).toString()
        return evaluate(b, { x })
    }

    while (er >= er1) {
        if (i > 0) {
            fx1 = fx(x).toFixed(6)
            fx2 = diffx(x).toFixed(6)
            xi = parseFloat(x - (fx1 / fx2).toFixed(6))
            er = parseFloat(Math.abs((xi - x) / xi).toFixed(6))
            x = xi
        }
        if (i > 0) {
            result.push({ iteration: i, xi, fx: fx1, diffx: fx2, er })
        }
        i++
    }
    res.json({
        data: result,
    })
}

export const Onepoint = (req, res) => {
    const data = req.body
    let result = []
    let x = data.x
    let i = 0
    let xi
    let er = 1
    let er1 = data.error
    if (er1 == null || er1 <= 0) {
        er1 = 0.000001
    }
    let fx = (x) => {
        let a = simplify(data.eq).toString()
        return evaluate(a, { x })
    }
    while (er >= er1) {
        if (i > 0) {
            xi = fx(x)
            er = parseFloat(Math.abs((xi - x) / xi).toFixed(5))
            x = xi
            result.push({ iteration: i, x, xi, er })
        }
        i++
    }
    res.json({
        data: result,
    })
}

export const Secant = (req, res) => {
    const data = req.body
    let result = []
    let x0 = data.x0
    let x1 = data.x1
    let i = 1
    let xi, fx0, fx1, deltax
    let er = 1
    let er1 = data.error
    if (er1 == null || er1 <= 0) {
        er1 = 0.000001
    }
    let fx = (x) => {
        let a = simplify(data.eq).toString()
        return evaluate(a, { x })
    }
    while (er >= er1) {
        if (i > 0) {
            fx0 = fx(x0).toFixed(5)
            fx1 = fx(x1).toFixed(5)
            deltax = parseFloat(((fx1 * (x0 - x1)) / (fx0 - fx1)).toFixed(5))
            xi = parseFloat((x1 - deltax).toFixed(5))
            er = parseFloat(Math.abs((xi - x1) / xi).toFixed(6))
            x0 = x1
            x1 = xi
            result.push({ iteration: i, x0, x1, fx0, fx1, deltax, xi, er })
        }
        i++
    }
    res.json({
        data: result,
    })
}

export default { Bisection, Falseposition, Newtonraphson, Onepoint, Secant }
