function mergePresetConfig(defaultConfig, userConfig) {
    const result = { ...defaultConfig, ...userConfig };

    // ---- 重点：处理 extension override ----
    if (userConfig.extensions && userConfig.extensions.length > 0) {
        const defaultMap = new Map();
        const userMap = new Map();

        // 默认扩展映射：key 为 extension.name
        defaultConfig.extensions.forEach((ext) => {
            console.log("ext:", ext);
            defaultMap.set(ext.name, ext);
        });

        // 用户扩展映射
        userConfig.extensions.forEach((ext) => {
            
            userMap.set(ext.name, ext);
        });

        // 覆盖逻辑：用户扩展优先
        const finalExt = [];

        for (const [name, ext] of defaultMap.entries()) {
            if (userMap.has(name)) {
                finalExt.push(userMap.get(name));  // 使用用户的配置
            } else {
                finalExt.push(ext); // 默认配置
            }
        }

        // 用户多余的扩展追加进去
        for (const [name, ext] of userMap.entries()) {
            if (!defaultMap.has(name)) {
                finalExt.push(ext);
            }
        }

        result.extensions = finalExt;
    }

    return result;
}

export { mergePresetConfig }
