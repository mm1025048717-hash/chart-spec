# 贡献指南

感谢你对 Chart Spec 的关注！我们欢迎任何形式的贡献。

## 如何贡献

### 报告问题

1. 确保问题没有被重复报告
2. 使用清晰的标题描述问题
3. 提供复现步骤
4. 附上截图（如适用）

### 提交代码

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/your-feature`
3. 提交改动：`git commit -m 'Add some feature'`
4. 推送分支：`git push origin feature/your-feature`
5. 创建 Pull Request

### 添加新图表

如果要添加新的图表类型：

1. 在根目录创建新文件夹，命名格式：`XX-图表名/`
2. 创建 `index.html` 文件，参考其他图表的结构
3. 创建 `spec.md` 文件，描述设计规范
4. 在 `nav.js` 中添加导航项
5. 更新 `README.md` 中的图表列表

### 代码规范

- 使用 4 空格缩进
- CSS 类名使用 kebab-case
- JavaScript 变量使用 camelCase
- 保持代码简洁、可读

### 设计规范

- 遵循现有的颜色系统
- 保持一致的间距和字号
- 动画时长建议：0.2s - 0.3s
- 使用 CSS 变量定义可复用值

## 文件结构

```
chart-spec/
├── index.html          # 首页
├── common.css          # 公共样式
├── nav.js              # 导航组件
├── XX-图表名/
│   ├── index.html      # 图表演示页
│   └── spec.md         # 设计规范文档
```

## 提交信息规范

```
feat: 添加新功能
fix: 修复问题
docs: 文档更新
style: 样式调整
refactor: 代码重构
```

## 问题反馈

如有任何问题，请通过 GitHub Issues 联系我们。

---

再次感谢你的贡献！
