const capitalizeNum = value => {
    if (parseInt(value) > 100000) {
        return "100000+"
    } else {
      return parseInt(value)
    }
}
const capitalizeNumMany = value => {
    if (parseInt(value) > 100000) {
        return "10w+"
    } else {
      return parseInt(value)
    }
}
const NumberToFixed = value => {
    return parseFloat((parseFloat(value)*100).toFixed(2))
}
const formatMoney = value => {
    return (value/100).toFixed(2).toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,");
}
export default { capitalizeNum,capitalizeNumMany,NumberToFixed,formatMoney }