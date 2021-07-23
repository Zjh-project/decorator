require('@babel/register');
const fs = require('fs');
const path = require('path');

const autoRouter = (router, options = {}) => {
    const {source = 'controller'} = options;
    const rootPath = process.cwd();
    const controller = path.join(rootPath, source);

    // 处理错误
    const dealError = (fn) => {
        return async (...params) => {
            if (!fn) return;
            const next = params.slice(-1)[0];
            try {
                await fn(...params);
            } catch (e) {
                next(e);
            }
        }
    };

    /**
     * 自动加载路由控制器
     *
     */
    const dirList = fs.readdirSync(controller);
    for (let fileName of dirList) {
        try {
            const Init = require(path.join(controller, fileName));
            const instance = new Init();
            if (!Init?.reqParams) continue;
            const {baseUrl = '', ...req} = Init.reqParams;
            for (let key in req) {
                const {url, method} = req[key];
                router[method](baseUrl + url, dealError(instance[key]));
            }
        } catch (e) {
            console.log(e)
        }
    }
    return router;
};


module.exports = autoRouter;
