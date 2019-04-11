/**
 * @description 创建指定目录下的 hexo 文档
 * eg.. cmd tit=<tit> [lay=<lay>] [out=<out>]
 */
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const {
    parseParams,
    log,
    diffTime,
} = require('./cli');
const {
    dirExists
} = require('./fs');

const {
    tit,
    lay,
    out
} = parseParams(['tit', 'lay', 'out']);

// 依据 hexo 创建文档
function createMd() {
    return new Promise((resolve, reject) => {
        if (!tit) {
            return reject(new Error('创建hexo文档需要传递文档名称'));
        }
        const command = `hexo n ${lay} ${tit}`;
        const startTime = Date.now();
        log(`start '${command}' ...`);
        childProcess.exec(command, (error, stdout, stderr) => {
            if (error) {
                return reject(error);
            }
            log(`end '${command}' after`, diffTime(startTime, Date.now()));
            resolve();
        });
    });
}

// 移动文件到指定路径
async function removeFile() {
    const mdPath = path.join(__dirname, '../source/_posts/');
    const sourceFile = path.join(mdPath, `./${tit}.md`);

    if (!out) return;

    const distPath = path.join(mdPath, `./${out}`);

    await dirExists(distPath);
    log('资源目录准备完毕！');
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        log(`start 'removemd' ...`);
        // 将文件拷贝到指定目录
        fs.copyFile(sourceFile, path.join(distPath, `./${tit}.md`), err => {
            if (err) {
                return reject(err);
            }
            // 删除目标文件
            fs.unlink(sourceFile, err => {
                if (err) {
                    return reject(err);
                }
                log(`end removemd after`, diffTime(startTime, Date.now()));
                resolve();
            });
        });

    });
}

async function newMd() {
    await createMd();
    await removeFile();
}

newMd()
    .catch(err => {
        console.log(err);
    });