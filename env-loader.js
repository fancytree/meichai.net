// 环境变量加载器
// 这个脚本用于在前端加载.env文件中的环境变量

// 简单的.env文件解析器
function loadEnvFile() {
    return fetch('.env')
        .then(response => {
            if (!response.ok) {
                throw new Error('无法加载.env文件');
            }
            return response.text();
        })
        .then(text => {
            const env = {};
            const lines = text.split('\n');
            
            lines.forEach(line => {
                line = line.trim();
                // 跳过注释和空行
                if (line && !line.startsWith('#')) {
                    const [key, ...valueParts] = line.split('=');
                    if (key && valueParts.length > 0) {
                        env[key.trim()] = valueParts.join('=').trim();
                    }
                }
            });
            
            return env;
        })
        .catch(error => {
            console.warn('无法加载.env文件:', error.message);
            return {};
        });
}

// 将环境变量注入到全局作用域
function injectEnvToGlobal() {
    return loadEnvFile().then(env => {
        if (typeof window !== 'undefined') {
            window.ENV = env;
            console.log('环境变量已加载:', Object.keys(env));
        }
        return env;
    });
}

// 自动执行
if (typeof window !== 'undefined') {
    // 在DOM加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectEnvToGlobal);
    } else {
        injectEnvToGlobal();
    }
}

// 导出函数供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadEnvFile, injectEnvToGlobal };
}