const agoDate = (fecha) => {
    const hoy = new Date()
    const restante = hoy - fecha
    const miliPorMinu = 60 * 1000
    const miliPorHor = 60 * miliPorMinu
    const miliPorDia = 24 * miliPorHor
    return  Math.round(restante / miliPorDia)
}
module.exports = agoDate;