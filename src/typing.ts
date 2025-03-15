export type Option = {
  fontFamily?: "alpha" | 'big' | 'crazy';
  spacing?: number;
  maxLineWidth: number;
};

export type FontResolve = {
  defs: number[] | string[];
  codes: number[];
  content?: string[]
};

export type FontRender = {
  lines: string[];
  width: number;
  height: number;
  def: number | string;
};
