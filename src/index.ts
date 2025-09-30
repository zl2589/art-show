import { load } from "./load";
import { layout } from "./layout";
import { Option } from "./typing";

const DEFAULT_SPACING = 1;
const DEFAULT_MAX_LINE_WIDTH = Infinity;

const defaultOption = {
  spacing: DEFAULT_SPACING,
  maxLineWidth: DEFAULT_MAX_LINE_WIDTH,
};


export async function createArts(str: string, opt?: Partial<Option>) {
  const option = {
    ...defaultOption,
    ...opt,
    spacing: opt && opt.spacing && opt?.spacing > 20 ? 20 : opt?.spacing,
  };

  const dict = await load(option);
  const lines = layout(str, dict, option);

  lines.forEach((c) => {
    console.log(c);
  });
}

export type { Option };
