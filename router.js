require('@babel/register');
const fs = require('fs');
const path = require('path');

const autoRouter = (router, options = {}) => {
    const {con_path = 'controller', inter_path = 'interceptor'} = options;
    const rootPath = process.cwd();
    const controller = path.join(rootPath, con_path);
    const interceptor = path.join(rootPath, inter_path);

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
     * 自动加载拦截器
     *
     */
    const isValid = fs.existsSync(interceptor);
     if (isValid) {
        const InDirList = fs.readdirSync(interceptor);
        for (let fileName of InDirList) {
            try {
                const Init = require(path.join(interceptor, fileName));
                const instance = new Init();
                if (!Init?.reqParams) continue;
                const {rootUrl = ''} = Init.reqParams;
                router.use(rootUrl, (req, res, next) => {
                    instance.init(req, res, next);
                })
            } catch (e) {
                console.log(e);
            }
        }
    }
     
    /**
     * 自动加载路由控制器
     *
     */
    const ConDirList = fs.readdirSync(controller);
    for (let fileName of ConDirList) {
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
            console.log(e);
        }
    }
    return router;
};


module.exports = autoRouter;
