function mergePresetConfig(defaultConfig, userConfig) {
    const result = { ...defaultConfig };

    // Merge editorOption
    if (userConfig.editorOption) {
        result.editorOption = { ...(defaultConfig.editorOption || {}), ...userConfig.editorOption };
    }

    // Merge style
    if (userConfig.style) {
        result.style = { ...(defaultConfig.style || {}), ...userConfig.style };
    }

    // Merge events
    if (userConfig.events) {
        result.events = { ...(defaultConfig.events || {}), ...userConfig.events };
    }

    // ---- 重点：处理 extension override ----
    if (userConfig.extensions && userConfig.extensions.length > 0) {
        const userMap = new Map();

        // 用户扩展映射
        userConfig.extensions.forEach((ext) => {
            if (ext && ext.name) {
                userMap.set(ext.name, ext);
            }
        });

        const finalExt = [];
        const defaultExtensionNames = new Set();
        const defaultExtensions = defaultConfig.extensions || [];

        // 遍历默认扩展，保留顺序和数量
        defaultExtensions.forEach((ext) => {
            if (ext && ext.name) {
                defaultExtensionNames.add(ext.name);
                if (userMap.has(ext.name)) {
                    finalExt.push(userMap.get(ext.name)); // 使用用户的配置覆盖
                } else {
                    finalExt.push(ext); // 保持默认
                }
            }
        });

        // 用户多余的扩展追加进去
        for (const [name, ext] of userMap.entries()) {
            if (!defaultExtensionNames.has(name)) {
                finalExt.push(ext);
            }
        }

        result.extensions = finalExt;
    }

    return result;
}

export { mergePresetConfig }
