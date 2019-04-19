function getRandomRgb() {
    const num = Math.round(0xffffff * Math.random()),
        r = num >> 16,
        g = (num >> 8) & 255,
        b = num & 255
    return `rgb(${r},${g},${b})`
}