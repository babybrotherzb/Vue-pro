const path = require("path");
const log4js = require("koa-log4");
var fs = require("fs");

var basePath = path.resolve(__dirname, "../logs");

var errorPath = basePath + "/errors/";
var resPath = basePath + "/responses/";
var accessPath = basePath + "/access/";

const confirmPath = function(pathStr) {
    if (!fs.existsSync(pathStr)) {
        fs.mkdirSync(pathStr);
    }
};

log4js.configure({
    appenders: {
        errors: {
            type: "dateFile",
            pattern: "yyyy-MM-dd.log", // 生成文件的规则 后缀
            alwaysIncludePattern: true, // 是否总是有后缀名
            filename: path.join(__dirname, "../logs/errors/"), //生成文件名
            maxLogSize: 10240
        },
        access: {
            type: "dateFile",
            pattern: "yyyy-MM-dd.log", // 生成文件的规则 后缀
            alwaysIncludePattern: true, // 是否总是有后缀名
            filename: path.join(__dirname, "../logs/access/"), //生成文件名
            maxLogSize: 10240
        },
        responses: {
            type: "dateFile",
            pattern: "yyyy-MM-dd.log", // 后缀，
            alwaysIncludePattern: true,
            filename: path.join(__dirname, "../logs/responses/"),
            maxLogSize: 10240
        },
        out: {
            type: "console"
        }
    },
    categories: {
        default: {
            appenders: ["out", "errors", "responses"],
            level: "trace"
        },
        access: {
            appenders: ["access"],
            level: "info"
        },
        errors: {
            appenders: ["errors"],
            level: "error"
        },
        responses: {
            appenders: ["responses"],
            level: "info"
        }
    },
    disableClustering: true // 适用于集群
});

//创建log的根目录'logs'
if (basePath) {
    confirmPath(basePath);

    //根据不同的logType创建不同的文件目录
    confirmPath(errorPath);
    confirmPath(resPath);
    confirmPath(accessPath);
}

// exports.accessLogger = () => log4js.koaLogger(log4js.getLogger('access')); //记录所有访问级别的日志
exports.accessLogger = () => log4js.koaLogger(log4js.getLogger("access")); //记录所有访问级别的日志
exports.responsesLogger = log4js.getLogger("responses"); //记录所有应用级别的日志
exports.errorsLogger = log4js.getLogger("errors"); //记录所有应用级别的日志
