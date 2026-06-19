export const defineExtension = (config) => {
  return {
    configure(options) {
      if (this.extension && typeof this.extension.configure === 'function') {
        return {
          ...this,
          extension: this.extension.configure(options),
        };
      }
      return this;
    },
    ...config,
  };
};

export default { defineExtension };
