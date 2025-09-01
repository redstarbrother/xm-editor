const getEditorExtensions = () => {
  const extensions = DependencieExtensions.concat(props.extensions);
  const slashItems = collectSlashItems(extensions);
  console.log("slashItems:", JSON.stringify(slashItems, null, 2));

  // 确保 slashItems 是一个数组且每个项都有必要的属性
  const validSlashItems = Array.isArray(slashItems)
    ? slashItems.filter(
        (item) => item && typeof item === "object" && item.label
      )
    : [];

  console.log("validSlashItems:", JSON.stringify(validSlashItems, null, 2));

  extensions.push(
    // 配置slash menu
    SlashCommand.configure({
      items: validSlashItems,
    })
  );
  return extensions;
};



export { getEditorExtensions };