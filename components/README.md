# 组件系统说明

本项目已将导航栏和底部栏重构为可复用的组件，确保在所有页面中保持一致的样式和功能。

## 组件文件结构

```
components/
├── navbar.html      # 导航栏组件（包含HTML、CSS、JavaScript）
├── footer.html      # 底部栏组件（包含HTML、CSS、JavaScript）
├── components.js    # 组件加载器
└── README.md        # 本说明文件
```

## 使用方法

### 方法一：使用容器加载（推荐）

1. 在HTML页面中添加组件容器：
```html
<!-- 导航栏容器 -->
<div id="navbar-container"></div>

<!-- 页面内容 -->
<main>
    <!-- 你的页面内容 -->
</main>

<!-- 底部栏容器 -->
<div id="footer-container"></div>
```

2. 引入组件加载器：
```html
<script src="components/components.js"></script>
```

3. 组件会自动加载到对应容器中。

### 方法二：手动加载

```javascript
// 加载所有组件
componentLoader.loadAllComponents();

// 或者单独加载
componentLoader.loadNavbar('navbar-container');
componentLoader.loadFooter('footer-container');
```

### 方法三：直接插入到body

```javascript
// 直接插入到页面开头和结尾
componentLoader.insertNavbarToBody();
componentLoader.insertFooterToBody();
```

## 组件特性

### 导航栏组件 (navbar.html)
- **响应式设计**：支持桌面端、平板和移动端
- **滚动效果**：页面滚动时自动调整高度和样式
- **活动状态**：自动检测当前页面并高亮对应导航链接
- **毛玻璃效果**：backdrop-filter 模糊背景
- **平滑过渡**：所有状态变化都有平滑动画

### 底部栏组件 (footer.html)
- **社交链接**：LinkedIn 和 GitHub 链接
- **联系按钮**："Get in Touch" 行动按钮
- **版权信息**：动态年份显示
- **响应式布局**：移动端自动调整为垂直布局

## 样式一致性

所有组件使用统一的设计系统：
- **字体**：Inter 字体系列
- **颜色**：主色 #171616，强调色 #F45D22
- **间距**：统一的内边距和外边距
- **圆角**：统一的边框圆角
- **阴影**：统一的阴影效果

## 响应式断点

- **桌面端**：> 768px
- **平板端**：≤ 768px
- **移动端**：≤ 480px

## 自定义配置

### 修改导航链接

编辑 `navbar.html` 中的导航链接：
```html
<ul class="nav-links">
    <li><a href="index.html#work" class="nav-link" data-page="work">Work</a></li>
    <li><a href="about.html" class="nav-link" data-page="about">About</a></li>
    <li><a href="index.html#contact" class="nav-link" data-page="contact">Contact</a></li>
</ul>
```

### 修改社交链接

编辑 `footer.html` 中的社交链接：
```html
<div class="social-icons">
    <a href="https://www.linkedin.com/in/meichai" target="_blank" class="social-link">
        <!-- LinkedIn SVG -->
    </a>
    <a href="https://github.com/meichai" target="_blank" class="social-link">
        <!-- GitHub SVG -->
    </a>
</div>
```

## 注意事项

1. **文件路径**：确保组件文件路径正确，相对于引用页面的位置
2. **CSS 冲突**：移除页面中原有的导航栏和底部栏样式，避免样式冲突
3. **JavaScript 依赖**：组件包含自己的 JavaScript 逻辑，无需额外依赖
4. **浏览器兼容性**：支持现代浏览器，使用了 backdrop-filter 等现代 CSS 特性

## 维护建议

- 所有样式和功能修改都应在组件文件中进行
- 测试时确保在所有页面中组件表现一致
- 添加新页面时使用相同的组件引用方式
- 定期检查组件在不同设备和浏览器中的表现