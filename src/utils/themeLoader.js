
// 或者如果你想保留原有的 Promise 结构和逻辑，完整的修改如下：
const CODE_THEME_ID = "xm-code-theme";

export function loadCodeTheme(themeName) {
  return new Promise((resolve, reject) => {
    // 🚨 关键修改：直接使用网站根目录绝对路径来引用public目录下的静态资源
    // 这样打包后（资源在 dist/code-themes/）和开发时都能正确访问
    const href = `/code-themes/${themeName}.css`; // 如果已经存在 <link> 标签，先移除

    const oldLink = document.getElementById(CODE_THEME_ID);
    if (oldLink) oldLink.remove(); // 创建新的 <link>

    const link = document.createElement("link");
    link.id = CODE_THEME_ID;
    link.rel = "stylesheet";
    link.href = href;

    link.onload = () => resolve();
    link.onerror = () => reject(`加载代码主题失败: ${href}`);

    console.log("加载代码主题:", href);
    document.head.appendChild(link);
  });
}
