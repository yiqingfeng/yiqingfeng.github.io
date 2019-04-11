/**
 * @description node cli 命令行解析
 */
const _ = require('lodash');
const moment = require('moment');

// 解析 cli 参数
exports.parseParams = function parseParams(keys) {
    const argv = process.argv.slice(2);
    const params = {};
    argv.forEach(item => {
        const data = (item + '').split('=');
        if (data.length > 1) {
            params[data[0]] = data[1];
        } else {
            params[data[0]] = true;
        }
    });
    // 依据指定的 keys 规则格式化数据
    function formatParams(data, keys) {
        const result = {};
        Object.keys(keys).forEach(key => {
            if (Array.isArray(keys[key])) {
                keys[key].forEach(item => {
                    result[key] = data[item] || result[key];
                });
            } else {
                result[key] = data[keys[key]];
            }
        });
        return result;
    }
    return keys ? formatParams(params, keys) : params;
};

// 输出日志
exports.log = function log(msg, time) {
    const now = moment(new Date()).format('HH:mm:ss');
    console.log('[\x1b[36m%s\x1b[0m] %s \x1b[35m%s\x1b[0m', now, msg, time || '');
}

// 起止时间展示 s ms
exports.diffTime = function diffTime(start, end) {
    const startTime = moment(start);
    const endTime = moment(end);
    const diffTime = endTime.diff(startTime);
    if (diffTime < 1000) {
        return `${diffTime} ms`;
    }
    return `${diffTime / 1000} s`;
};