import * as Suggestion from "@/extensions/Suggestion/Suggestion";

export class ExtensionManager {
  constructor(extensions = [], editorConfig = {}) {
    this.rawExtensions = extensions;
    this.editorConfig = editorConfig;
    this.extensions = [];
    this.manifests = [];
    // 存放组件（比如fixed菜单）
    this.components = [];

    this.init();
  }

  init() {
    let slashExtension = null;
    this.rawExtensions.forEach((item) => {
      // 收集扩展
      if (item.extension) {
        this.extensions.push(item.extension);
      }
        
      // 收集扩展的manifest配置
      if (item.manifest) {
        this.manifests.push({
          key: item.name,
          value: item.manifest || {},
        });
      }

      // 收集组件
      if (item.component) {
        this.components.push({
          name: item.name,
          component: item.component,
        });
      }

      // 获取Slash扩展
      if (item.name === "slash") {
        slashExtension = item.extension;
      }
    });

    // 初始化Slash扩展
    this.initSlashExtension(slashExtension);

    // 初始化Suggestion扩展
    this.extensions.push(...this.initSuggestionExtension());
  }

  // 初始化Slash扩展
  initSlashExtension(slashExtension) {
    console.log("slashExtension: ", slashExtension);
    if (slashExtension) {
      let slashItems = [];
      this.manifests.forEach((manifest) => {
        // 获取manifest的slash配置
        let manifestValue = manifest.value || {};
        if (manifestValue.slashMenu) {
          if (Array.isArray(manifestValue.slashMenu)) {
            slashItems.push(...manifestValue.slashMenu);
          } else {
            slashItems.push(manifestValue.slashMenu);
          }
        }
      });
      console.log("slashItems: ", slashItems);
      
      // 使用 configure 配置扩展，并替换列表中的引用
      const configuredExtension = slashExtension.configure({
        items: slashItems,
      });

      const index = this.extensions.indexOf(slashExtension);
      if (index !== -1) {
        this.extensions[index] = configuredExtension;
      }
    }
  }

  // 初始化Suggestion扩展
  initSuggestionExtension() {
    let suggestionExtension = [];
    let suggestionConfigItems = [];
    this.manifests.forEach((manifest) => {
      // 获取manifest的suggestion配置
      let manifestValue = manifest.value || {};
      if (manifestValue.suggestion) {
        suggestionConfigItems.push(manifestValue.suggestion);
      }
    });
    console.log("this.manifests: ", this.manifests);
    
    console.log("suggestionConfigItems: ", suggestionConfigItems);
    
    suggestionConfigItems?.forEach((item) => {
      suggestionExtension.push(Suggestion.createSuggestion(item));
    });
    console.log("suggestionExtension: ", suggestionExtension);
    
    return suggestionExtension;
  }

  getTiptapExtensions() {
    return this.extensions.filter((ext) => ext !== null && ext.name !== 'segmentation'); // Filter out null extensions (UI-only)
  }

  getFixedMenuItems() {
    return this.manifests
      .filter((m) => m.value.fixedMenu)
      .map((m) => ({
        ...m.value.fixedMenu,
        name: m.key,
      }));
  }

  getBubbleMenuItems() {
    return this.manifests
      .filter((m) => m.value.bubbleMenu)
      .map((m) => ({
        ...m.value.bubbleMenu,
        name: m.key,
      }));
  }

  getSlashMenuItems() {
    return this.manifests
      .filter((m) => m.value.slashMenu)
      .map((m) => ({
        ...m.value.slashMenu,
        name: m.key,
      }));
  }

  getExtension(name) {
    return this.extensions.find((ext) => ext.name === name);
  }

  getComponent(name) {
    const comp = this.components.find((comp) => comp.name === name);
    return comp ? comp.component : null;
  }
}
