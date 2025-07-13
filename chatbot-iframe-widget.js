
/**
 * Mei Chatbot iframe Widget
 * 一个基于iframe的可复用聊天机器人组件
 */
class MeiChatbotiframe {
    constructor(options = {}) {
        this.options = {
            // 触发器配置
            triggerSelector: options.triggerSelector || null,
            triggerText: options.triggerText || '💬',
            triggerPosition: options.triggerPosition || 'bottom-right', // bottom-right, bottom-left, top-right, top-left
            
            // iframe配置
            iframeSrc: options.iframeSrc || './chatbot-iframe.html',
            width: options.width || '400px',
            height: options.height || '600px',
            
            // 显示配置
            autoShow: options.autoShow || false,
            showDelay: options.showDelay || 0,
            
            // 样式配置
            zIndex: options.zIndex || 9999,
            borderRadius: options.borderRadius || '12px',
            boxShadow: options.boxShadow || '0 8px 32px rgba(0, 0, 0, 0.12)',
            
            // 回调函数
            onOpen: options.onOpen || null,
            onClose: options.onClose || null,
            
            ...options
        };
        
        this.isVisible = false;
        this.iframe = null;
        this.container = null;
        this.trigger = null;
        
        this.init();
    }
    
    init() {
        this.createStyles();
        this.createContainer();
        this.createTrigger();
        this.bindEvents();
        
        if (this.options.autoShow) {
            setTimeout(() => this.show(), this.options.showDelay);
        }
    }
    
    createStyles() {
        if (document.getElementById('mei-chatbot-iframe-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'mei-chatbot-iframe-styles';
        style.textContent = `
            .mei-chatbot-iframe-container {
                position: fixed;
                width: ${this.options.width};
                height: ${this.options.height};
                z-index: ${this.options.zIndex};
                border-radius: ${this.options.borderRadius};
                box-shadow: ${this.options.boxShadow};
                background: white;
                transform: scale(0);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                overflow: hidden;
                transform-origin: bottom right;
            }
            
            .mei-chatbot-iframe-container.visible {
                transform: scale(1);
                opacity: 1;
                visibility: visible;
            }
            
            .mei-chatbot-iframe-container.bottom-right {
                bottom: 20px;
                right: 20px;
                transform-origin: bottom right;
            }
            
            .mei-chatbot-iframe-container.bottom-left {
                bottom: 20px;
                left: 20px;
                transform-origin: bottom left;
            }
            
            .mei-chatbot-iframe-container.top-right {
                top: 20px;
                right: 20px;
                transform-origin: top right;
            }
            
            .mei-chatbot-iframe-container.top-left {
                top: 20px;
                left: 20px;
                transform-origin: top left;
            }
            
            .mei-chatbot-iframe {
                width: 100%;
                height: 100%;
                border: none;
                border-radius: ${this.options.borderRadius};
                background: white;
            }
            
            .mei-chatbot-trigger {
                position: fixed;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, #F45D22 0%, #FF7A47 100%);
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: white;
                z-index: ${this.options.zIndex + 1};
                box-shadow: 0 4px 20px rgba(244, 93, 34, 0.3);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                transform: scale(1);
            }
            
            .mei-chatbot-trigger:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 25px rgba(244, 93, 34, 0.4);
            }
            
            .mei-chatbot-trigger.bottom-right {
                bottom: 20px;
                right: 20px;
            }
            
            .mei-chatbot-trigger.bottom-left {
                bottom: 20px;
                left: 20px;
            }
            
            .mei-chatbot-trigger.top-right {
                top: 20px;
                right: 20px;
            }
            
            .mei-chatbot-trigger.top-left {
                top: 20px;
                left: 20px;
            }
            
            .mei-chatbot-trigger.hidden {
                transform: scale(0);
                opacity: 0;
                visibility: hidden;
            }
            
            /* 响应式设计 */
            @media (max-width: 480px) {
                .mei-chatbot-iframe-container {
                    width: calc(100vw - 20px) !important;
                    height: calc(100vh - 40px) !important;
                    bottom: 10px !important;
                    right: 10px !important;
                    left: 10px !important;
                    top: 10px !important;
                }
                
                .mei-chatbot-iframe-container.bottom-right,
                .mei-chatbot-iframe-container.bottom-left,
                .mei-chatbot-iframe-container.top-right,
                .mei-chatbot-iframe-container.top-left {
                    bottom: 10px;
                    right: 10px;
                    left: 10px;
                    top: auto;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    createContainer() {
        this.container = document.createElement('div');
        this.container.className = `mei-chatbot-iframe-container ${this.options.triggerPosition}`;
        
        this.iframe = document.createElement('iframe');
        this.iframe.className = 'mei-chatbot-iframe';
        this.iframe.src = this.options.iframeSrc;
        this.iframe.title = 'Mei Chatbot';
        
        this.container.appendChild(this.iframe);
        document.body.appendChild(this.container);
    }
    
    createTrigger() {
        // 如果指定了自定义触发器，则使用现有元素
        if (this.options.triggerSelector) {
            this.trigger = document.querySelector(this.options.triggerSelector);
            if (!this.trigger) {
                console.warn(`Chatbot trigger element not found: ${this.options.triggerSelector}`);
                return;
            }
        } else if (this.options.triggerSelector !== null) {
            // 只有当triggerSelector不是null时才创建默认触发器按钮
            this.trigger = document.createElement('button');
            this.trigger.className = `mei-chatbot-trigger ${this.options.triggerPosition}`;
            this.trigger.innerHTML = this.options.triggerText;
            this.trigger.title = 'Chat with Mei';
            document.body.appendChild(this.trigger);
        }
        // 当triggerSelector为null时，不创建任何触发器
    }
    
    bindEvents() {
        // 触发器点击事件
        if (this.trigger) {
            this.trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle();
            });
        }
        
        // 监听iframe内的关闭消息
        window.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'closeChatbot') {
                this.hide();
            }
        });
        
        // ESC键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });
        
        // 点击外部关闭
        document.addEventListener('click', (e) => {
            if (this.isVisible && 
                !this.container.contains(e.target) && 
                (!this.trigger || !this.trigger.contains(e.target))) {
                this.hide();
            }
        });
    }
    

    
    show() {
        if (this.isVisible) return;
        
        this.isVisible = true;
        this.container.classList.add('visible');
        
        // 隐藏触发器
        if (this.trigger && !this.options.triggerSelector) {
            this.trigger.classList.add('hidden');
        }
        
        // 执行回调
        if (this.options.onOpen) {
            this.options.onOpen();
        }
        
        // 聚焦到iframe
        setTimeout(() => {
            if (this.iframe) {
                this.iframe.focus();
            }
        }, 300);
    }
    
    hide() {
        if (!this.isVisible) return;
        
        this.isVisible = false;
        this.container.classList.remove('visible');
        
        // 显示触发器
        if (this.trigger && !this.options.triggerSelector) {
            this.trigger.classList.remove('hidden');
        }
        
        // 执行回调
        if (this.options.onClose) {
            this.options.onClose();
        }
    }
    
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
    
    // 公共API方法
    open() {
        this.show();
    }
    
    close() {
        this.hide();
    }
    
    isOpen() {
        return this.isVisible;
    }
    
    destroy() {
        // 移除事件监听器
        if (this.trigger && !this.options.triggerSelector) {
            this.trigger.remove();
        }
        
        if (this.container) {
            this.container.remove();
        }
        
        // 清理样式（如果没有其他实例）
        const existingInstances = document.querySelectorAll('.mei-chatbot-iframe-container');
        if (existingInstances.length === 0) {
            const styles = document.getElementById('mei-chatbot-iframe-styles');
            if (styles) {
                styles.remove();
            }
        }
    }
    
    // 更新配置
    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        
        // 重新应用样式
        if (newOptions.width || newOptions.height) {
            this.container.style.width = this.options.width;
            this.container.style.height = this.options.height;
        }
        
        if (newOptions.iframeSrc) {
            this.iframe.src = this.options.iframeSrc;
        }
    }
}

// 全局暴露
if (typeof window !== 'undefined') {
    window.MeiChatbotiframe = MeiChatbotiframe;
}

// 模块导出（如果支持）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MeiChatbotiframe;
}

// ES6模块导出（如果支持）
if (typeof exports !== 'undefined') {
    exports.MeiChatbotiframe = MeiChatbotiframe;
}