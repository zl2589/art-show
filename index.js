const load = require("./src/load");
const layout = require("./src/layout");

const DEFAULT_SPACING = 1;
const DEFAULT_MAX_LINE_WIDTH = Infinity;

const defaultOption = {
  spacing: DEFAULT_SPACING,
  maxLineWidth: DEFAULT_MAX_LINE_WIDTH,
};

function createArts(str, opt) {
  const option = {
    ...defaultOption,
    ...opt,
    spacing: opt?.spacing > 20 ? 20 : opt?.spacing,
  };

  const dict = load.load(option);
  const lines = layout.layout(str, dict, option);

  lines.forEach((c) => {
    console.log(c);
  });
}

module.exports = { createArts };
