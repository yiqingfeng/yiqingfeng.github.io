---
title: 利用bat第二弹
date: 2019-03-26 16:47:33
tags: 脚本
categories: shell编程
---

> 在实际问题处理中，我们不可避免地会遇到一些文件或其他操作的批量处理。在 **Linux** 系统中，我们可以利用 **shell** 脚本去完成这些重复的事情，减少一些不必要的操作。**window** 的 **bat**同理。

有兴趣的同学可以看一下前一篇 {% post_link bat %}

### 一、系统脚本足够强大吗？

在处理实际问题时，系统脚本命令能够完全满足我们的需求吗？以 **bat** 为例，在处理一些简单的逻辑时，**dos**能满足我们的需求，但是一旦需要进行一些复杂的逻辑判断，甚至是计算时，**dos**就无能为力了。

例如：一个文件夹内有 1.txt - 100.txt 100个文件，我希望对这些文件重命名为 001.txt - 100.txt。这个时候 **dos** 能处理吗？

### 二、node + dos

在 **node.js** 中，我们可以进行复杂的逻辑运算，同时我们也可以利用 **node.js** 执行 **dos** 命令。即通过两者之间的结合，合理利用两者之间的优势，我们可以完成更高难度的操作。

### 三、看一个场景

在日常开发中，test 目录下，存在若干个子项目，当前开发项目长期依赖 test 下的子项目，因此希望能有一个脚本支持更新编译这些子项目。

这些子项目开发过程中的编译均为 `npm run dev`，当该命令会进行一个 **watch** 操作。

### 四、设计思路

- 更新所有子模块代码到最新的 **develop** 分支
- 依次编译各自子模块，等子模块相关操作完成后，结束该操作，执行下一个模块编译

### 五、相关代码

run.bat
``` bash
@for %%f in (a b c d) do @call update_module.bat %%f
node ./update/update.js
```

update_module.bat
``` bash
@cd %1
git reset --hard
@git checkout develop
@git pull origin develop
@cd ../
```

update.js
``` javascript
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
// https://github.com/pkrumins/node-tree-kill
const kill = require('./tree-kill');

const rootPath = __dirname;

getAllModules(rootPath)
	.then(list => {
		buildModules(list, 90000)
			.catch(e => {
				console.log(e);
			});
	})
	.catch(e => {
		console.log(e);
	});

// 编译模块列表
async function buildModules(list, delayTime) {
	for (let i = 0; i < list.length; i++) {
		await buildModule(list[i], delayTime);
	}
}
// 编译指定模块
function buildModule(moduleName, delayTime) {
    return new Promise((resolve, reject) => {
        const commond = `cd ${moduleName} && npm run dev`;
        const child = exec(commond);

        console.log('\x1b[36m%s: \x1b[32m%s \x1b[0m %s', '[start]', moduleName, commond);
        child.stdout.on('data', data => {
            console.log(`> ${data}`);
        });
        child.stderr.on('data', data => {
            console.log('\x1b[31m%s\x1b[0m ', data);
            reject(data);
        });
        child.on('exit', (code, signal) => {
            console.log(`child process exit: ${code} ${signal}`);
            resolve();
        });

        setTimeout(() => {
        	console.log('\x1b[33m[end]\x1b[0m: ', `时间到结束子任务${moduleName}`);
            // child.kill(child.pid); // 子进程无限循环时，无法杀死
            kill(child.pid);
        }, delayTime || 120000);
    });
}

// 更新模块信息
function updateModule(moduleName) {
	return new Promise((resolve, reject) => {
        const commond = `cat update_module.bat ${moduleName}`;
        const child = exec(commond);

        console.log('\x1b[36m%s: \x1b[32m%s \x1b[0m %s', '[start]', moduleName, commond);
        child.stdout.on('data', data => {
            console.log(`> ${data}`);
        });
        child.stderr.on('data', data => {
            console.log('\x1b[31m%s\x1b[0m ', data);
            reject(data);
        });
        child.on('exit', (code, signal) => {
            console.log(`child process exit: ${code} ${signal}`);
            resolve();
        });
    });
}

/**
 * 获取所有需要update的模块
 * @return {Array} 模块列表
 */
function getAllModules(root) {
	return new Promise((resolve, reject) => {
		const dealModules = [];
		readdir(root)
			.then(files => {
				const tasks = [];
				files.forEach(file => {
					let task = isDirectory(path.resolve(root, file));
					tasks.push(task);
					task.then(flag => {
							if (flag) {
								dealModules.push(file);
							}
						});
				});
				Promise.all(tasks)
					.then(() => {
						resolve(dealModules);
					})
					.catch(e => {
						reject(e);
					});
			})
			.catch(e => {
				reject(e);
			});
	});
}

/**
 * 读取一个目录下的所有文件或子目录
 */
function readdir(root) {
	return new Promise((resolve, reject) => {
		fs.readdir(root, (e, files) => {
			if (e) {
				return reject(e);
			}
			resolve(files);
		});
	});
}

/**
 * 判断某路径是否为文件夹/目录
 */
function isDirectory(path) {
	return new Promise((resolve, reject) => {
		fs.stat(path, (e, stat) => {
			if (e) {
				return reject(e);
			}
			if (stat.isDirectory()) {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	});
}
```