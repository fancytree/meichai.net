/**
 * 组件加载器 - 用于动态加载和初始化导航栏和底部栏组件
 */

class ComponentLoader {
    constructor() {
        this.loadedComponents = new Set();
    }

    /**
     * 加载组件HTML内容
     * @param {string} componentPath - 组件文件路径
     * @returns {Promise<string>} - 组件HTML内容
     */
    async loadComponent(componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentPath}`);
            }
            return await response.text();
        } catch (error) {
            console.error('Error loading component:', error);
            return '';
        }
    }

    /**
     * 插入组件到指定容器并执行其中的脚本
     * @param {string} containerId - 容器ID
     * @param {string} componentHtml - 组件HTML内容
     */
    insertComponent(containerId, componentHtml) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = componentHtml;
            // 执行组件中的脚本
            this.executeScripts(container);
        } else {
            console.warn(`Container with ID '${containerId}' not found`);
        }
    }

    /**
     * 执行容器中的脚本
     * @param {HTMLElement} container - 包含脚本的容器
     */
    executeScripts(container) {
        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.textContent = script.textContent;
            }
            document.head.appendChild(newScript);
            document.head.removeChild(newScript);
        });
    }

    /**
     * 加载导航栏组件
     * @param {string} containerId - 导航栏容器ID，默认为 'navbar-container'
     */
    async loadNavbar(containerId = 'navbar-container') {
        if (this.loadedComponents.has('navbar')) {
            return;
        }

        const navbarHtml = await this.loadComponent('components/navbar.html');
        if (navbarHtml) {
            this.insertComponent(containerId, navbarHtml);
            this.loadedComponents.add('navbar');
            console.log('Navbar component loaded successfully');
        }
    }

    /**
     * 加载底部栏组件
     * @param {string} containerId - 底部栏容器ID，默认为 'footer-container'
     */
    async loadFooter(containerId = 'footer-container') {
        if (this.loadedComponents.has('footer')) {
            return;
        }

        const footerHtml = await this.loadComponent('components/footer.html');
        if (footerHtml) {
            this.insertComponent(containerId, footerHtml);
            this.loadedComponents.add('footer');
            console.log('Footer component loaded successfully');
        }
    }

    /**
     * 加载按钮组件
     * @param {string} containerId - 按钮容器ID
     * @param {Object} options - 按钮配置选项
     * @param {string} options.href - 链接地址
     * @param {string} options.text - 按钮文本
     * @param {string} options.type - 按钮类型 (btn-primary 或 btn-secondary)
     * @param {boolean} options.download - 是否为下载链接
     */
    async loadButton(containerId, options = {}) {
        const { href = '#', text = 'Button', type = 'btn-primary', download = false } = options;
        
        let buttonHtml = await this.loadComponent('components/button.html');
        if (buttonHtml) {
            // 替换模板变量
            buttonHtml = buttonHtml.replace('{{href}}', href);
            buttonHtml = buttonHtml.replace('{{text}}', text);
            buttonHtml = buttonHtml.replace('{{type}}', type);
            buttonHtml = buttonHtml.replace('{{download}}', download ? 'download' : '');
            
            this.insertComponent(containerId, buttonHtml);
            console.log('Button component loaded successfully');
        }
    }

    /**
     * 加载所有组件
     * @param {Object} options - 配置选项
     * @param {string} options.navbarContainer - 导航栏容器ID
     * @param {string} options.footerContainer - 底部栏容器ID
     */
    async loadAllComponents(options = {}) {
        const {
            navbarContainer = 'navbar-container',
            footerContainer = 'footer-container'
        } = options;

        await Promise.all([
            this.loadNavbar(navbarContainer),
            this.loadFooter(footerContainer)
        ]);

        console.log('All components loaded successfully');
    }

    /**
     * 直接插入导航栏到页面开头
     */
    async insertNavbarToBody() {
        const navbarHtml = await this.loadComponent('components/navbar.html');
        if (navbarHtml) {
            // 创建临时容器来解析HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = navbarHtml;
            
            // 提取所有子元素并插入到body开头
            while (tempDiv.firstChild) {
                document.body.insertBefore(tempDiv.firstChild, document.body.firstChild);
            }
            
            // 执行组件中的脚本
            this.executeScripts(document.body);
            
            this.loadedComponents.add('navbar');
            console.log('Navbar component inserted to body successfully');
        }
    }

    /**
     * 直接插入底部栏到页面末尾
     */
    async insertFooterToBody() {
        const footerHtml = await this.loadComponent('components/footer.html');
        if (footerHtml) {
            // 创建临时容器来解析HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = footerHtml;
            
            // 提取所有子元素并插入到body末尾
            while (tempDiv.firstChild) {
                document.body.appendChild(tempDiv.firstChild);
            }
            
            // 执行组件中的脚本
            this.executeScripts(document.body);
            
            this.loadedComponents.add('footer');
            console.log('Footer component inserted to body successfully');
        }
    }
}

// 创建全局实例
const componentLoader = new ComponentLoader();

// 自动初始化函数
function initComponents(options = {}) {
    const {
        autoLoad = true,
        navbarContainer,
        footerContainer,
        insertToBody = false
    } = options;

    if (!autoLoad) return;

    if (insertToBody) {
        // 直接插入到body
        componentLoader.insertNavbarToBody();
        componentLoader.insertFooterToBody();
    } else {
        // 插入到指定容器
        componentLoader.loadAllComponents({
            navbarContainer,
            footerContainer
        });
    }
}

// 导出到全局
window.ComponentLoader = ComponentLoader;
window.componentLoader = componentLoader;
window.initComponents = initComponents;

// DOM加载完成后自动初始化（如果页面有对应容器）
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // 检查是否有组件容器
        const hasNavbarContainer = document.getElementById('navbar-container');
        const hasFooterContainer = document.getElementById('footer-container');
        
        if (hasNavbarContainer || hasFooterContainer) {
            initComponents();
        }
    });
} else {
    // DOM已加载，立即检查
    const hasNavbarContainer = document.getElementById('navbar-container');
    const hasFooterContainer = document.getElementById('footer-container');
    
    if (hasNavbarContainer || hasFooterContainer) {
        initComponents();
    }
}