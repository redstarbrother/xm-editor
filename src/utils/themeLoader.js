const CODE_THEME_ID = 'xm-code-theme'

export function loadCodeTheme(themeName) {
  return new Promise((resolve, reject) => {

    const href = `/code-themes/${themeName}.css`   // 后面说明你的主题放哪里

    // 如果已经存在 <link> 标签，先移除
    const oldLink = document.getElementById(CODE_THEME_ID)
    if (oldLink) oldLink.remove()

    // 创建新的 <link>
    const link = document.createElement('link')
    link.id = CODE_THEME_ID
    link.rel = 'stylesheet'
    link.href = href

    link.onload = () => resolve()
    link.onerror = () => reject(`加载代码主题失败: ${href}`)

    document.head.appendChild(link)
  })
}