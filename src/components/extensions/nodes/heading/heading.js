import TtHeading from "@tiptap/extension-heading";
import fixedConfig from "./fixed";
import slashConfig from "./slash";

const Heading = TtHeading.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      fixed: fixedConfig,
      slash: slashConfig,
    };
  },
});

export default Heading;
