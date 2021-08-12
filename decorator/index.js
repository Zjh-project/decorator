require('@babel/register');

class Decorator {
    static Controller(url) {
        return (target) => {
            target.reqParams = {...(target.reqParams || {}), baseUrl: url};
        }
    }
    static Interceptor(url) {
        return (target) => {
            target.reqParams = {...(target.reqParams || {}), rootUrl: url};
        }
    }

    static Use(url) {
        return init('use', url)
    }

    static Get(url) {
        return init('get', url)
    }

    static Post(url) {
        return init('post', url)
    }

    static Put(url) {
        return init('put', url)
    }

    static Delete(url) {
        return init('delete', url)
    }
}

const init = (method = 'get', url = '/') => {
    return (target, funcName) => {
        target.constructor.reqParams = {
            ...(target.constructor.reqParams || {}),
            [funcName]: {
                url,
                method,
            }
        };
    }
};

module.exports = Decorator;