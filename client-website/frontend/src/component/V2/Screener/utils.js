import moment from "moment";

const IPODate = (name) => {
    const fixedLimit = "1870-01-01";
    const currdate = moment().format("YYYY-MM-DD");
    const yesterday =  moment().subtract(1, "day").format("YYYY-MM-DD");
    const week = moment().subtract(1, "week").format("YYYY-MM-DD");
    const month = moment().subtract(1, "month").format("YYYY-MM-DD");
    const year = moment().subtract(1, "year").format("YYYY-MM-DD");
    const morethan25year = moment().subtract(25, "years").format("YYYY-MM-DD");
    const morethan10year = moment().subtract(10, "year").format("YYYY-MM-DD");
    const morethan5year = moment().subtract(5, "year").format("YYYY-MM-DD");
    const morethanayear = moment().subtract(1, "year").format("YYYY-MM-DD");

    if(name === "any") return `${fixedLimit}_${currdate}`;
    if(name === "today") return `${currdate}_${currdate}`
    if(name === "yesterday") return `${yesterday}_${yesterday}`
    if(name === "week") return `${week}_${currdate}`
    if(name === "month") return `${month}_${currdate}`
    if(name === "year") return `${year}_${currdate}`
    if(name === "morethanayear") return `${fixedLimit}_${morethanayear}`
    if(name === "morethan5year") return `${fixedLimit}_${morethan5year}`
    if(name === "morethan10year") return  `${fixedLimit}_${morethan10year}`
    if(name === "morethan25year") return `${fixedLimit}_${morethan25year}`
}
export default IPODate;