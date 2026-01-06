export const defineExtension = (config) => {
  return {
    ...config,
    configure(options) {
      if (this.extension && typeof this.extension.configure === 'function') {
        return {
          ...this,
          extension: this.extension.configure(options),
        };
      }
      return this;
    },
  };
};

export default { defineExtension };
