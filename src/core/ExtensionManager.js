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
    let suggestionExtension = this.initSuggestionExtension();
    this.extensions.push(...suggestionExtension);
  }

  // 初始化Slash扩展
  initSlashExtension(slashExtension) {
    if (slashExtension) {
      let slashItems = [];
      this.manifests.forEach((manifest) => {
        // 获取manifest的slash配置
        let manifestValue = manifest.value || {};
        if (manifestValue.slash) {
          slashItems.push(manifestValue.slash);
        }
      });
      slashExtension.options.items = slashItems;
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
    suggestionConfigItems?.forEach((item) => {
      suggestionExtension.push(Suggestion.createSuggestion(item));
    });
    return suggestionExtension;
  }

  getTiptapExtensions() {
    return this.extensions.filter((ext) => ext !== null); // Filter out null extensions (UI-only)
  }

  getFixedMenuItems() {
    return this.manifests
      .filter((m) => m.fixedMenu)
      .map((m) => ({
        ...m.fixedMenu,
        name: m.name, // Ensure name is available
        title: m.title, // Ensure title is available
      }));
  }

  getBubbleMenuItems() {
    return this.manifests
      .filter((m) => m.bubbleMenu)
      .map((m) => ({
        ...m.bubbleMenu,
        name: m.name,
      }));
  }

  getSlashMenuItems() {
    return this.manifests
      .filter((m) => m.slashMenu)
      .map((m) => ({
        ...m.slashMenu,
        name: m.name,
      }));
  }

  getExtension(name) {
    return this.extensions.find((ext) => ext.name === name);
  }

  getComponent(name) {
    return this.components.find((comp) => comp.name === name);
  }
}
