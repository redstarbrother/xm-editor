import * as Suggestion from "@/extensions/Suggestion/Suggestion";

export class ExtensionManager {
  constructor(extensions = [], placeholder = "") {
    this.rawExtensions = extensions;
    this.placeholder = placeholder;
    this.extensions = [];
    this.manifests = [];
    // 存放组件（比如fixed菜单）
    this.components = [];
    // TOC 目录配置
    this.tocConfig = null;
    // DragHandle 拖拽手柄配置
    this.dragHandleConfig = null;
    // Table 表格扩展配置（右键菜单、浮动工具栏）
    this.tableConfig = null;

    this.init();
  }

  init() {
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

      // 收集 TOC 配置
      if (item.name === 'toc' && item.tocOptions) {
        this.tocConfig = {
          component: item.component,
          options: item.tocOptions,
        };
      }

      // 收集 DragHandle 配置
      if (item.name === 'drag-handle' && item.component) {
        this.dragHandleConfig = {
          component: item.component,
        };
      }

      // 收集 Table 表格扩展配置
      if (item.name === 'table') {
        this.tableConfig = {
          contextMenuComponent: item.contextMenuComponent || null,
          tableToolbarComponent: item.tableToolbarComponent || null,
        };
      }
    });

    // 初始化Placeholder扩展
    this.initPlaceholderExtension();

    // 初始化Slash扩展
    this.initSlashExtension();

    // 初始化Suggestion扩展
    this.initSuggestionExtension();
  }

  // 初始化placeholder扩展
  initPlaceholderExtension() {
    if (this.placeholder) {
      let placeholderExtension = this.extensions.find((ext) => ext.name === "placeholder");
      if (placeholderExtension) {
        // 使用 configure 配置扩展，并替换列表中的引用
        const configuredExtension = placeholderExtension.configure({
          placeholder: this.placeholder,
        });

        const index = this.extensions.indexOf(placeholderExtension);
        if (index !== -1) {
          this.extensions[index] = configuredExtension;
        }
      }
    }
  }

  // 初始化Slash扩展
  initSlashExtension() {
    let slashExtension = this.extensions.find((ext) => ext.name === "slash-menu");
    console.log("slashExtension", slashExtension);
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
      
      if (slashItems.length === 0) {
        const keys = this.manifests.map(m => m.key).join(', ');
        slashItems.push({ label: `DEBUG manifests: ${keys || 'empty'}`, id: "debug", category: "调试" });
      }
      
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
    
    suggestionConfigItems?.forEach((item) => {
      suggestionExtension.push(Suggestion.createSuggestion(item));
    });
    
    this.extensions.push(...suggestionExtension);
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

  /**
   * 获取 TOC 目录配置
   * @returns {{ component: Vue Component, options: Object } | null}
   */
  getTocConfig() {
    return this.tocConfig;
  }

  /**
   * 获取 DragHandle 拖拽手柄配置
   * @returns {{ component: Vue Component } | null}
   */
  getDragHandleConfig() {
    return this.dragHandleConfig;
  }

  /**
   * 获取 Table 表格扩展配置
   * @returns {{ contextMenuComponent: Vue Component, tableToolbarComponent: Vue Component } | null}
   */
  getTableConfig() {
    return this.tableConfig;
  }
}
