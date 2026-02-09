
// 或者如果你想保留原有的 Promise 结构和逻辑，完整的修改如下：
const CODE_THEME_ID = "xm-code-theme";

export function loadCodeTheme(themeName) {
  return new Promise((resolve, reject) => {

    // 从互联网拉取 (CDN)
    const href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/${themeName}.css`;

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
