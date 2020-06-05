export const isString = (s: any): s is string => typeof s === "string";

export const isArray = (s: any): s is any[] => Array.isArray(s);

export const isRegExp = (s: any): s is RegExp => s instanceof RegExp;

export const isObject = (s: any): s is Object =>
  typeof s === "object" && !isArray(s) && !isRegExp(s);

export const escapeRegExp = (string: string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const regExpFromString = (string: string) =>
  new RegExp(escapeRegExp(string));

export const getValues = (obj: Object, prop: string): any[] =>
  Object.values(obj).map((value) => value[prop]);

export const countLineBreaks = (string: string) =>
  string.split("\n").length - 1;

export const stringByteSize = (string: string) => new Blob([string]).size;

export const combineRegexp = (
  exps: any[],
  options?: { sticky?: boolean; groupAll?: boolean },
): RegExp => {
  const combinedString = exps.reduce(
    (acc: string, p: any) =>
      `${acc && acc + "|"}${options?.groupAll ? "(" : ""}${
        isRegExp(p) ? p.source : p
      }${options?.groupAll ? ")" : ""}`,
    "",
  );

  return new RegExp(combinedString, options?.sticky ? "y" : "");
};

export const combineArraySingleString = (
  exps: (RegExp | string)[],
  options?: { sticky?: boolean; groupAll?: boolean },
): string =>
  exps.reduce(
    (acc: string, p: any) =>
      `${acc && acc + "|"}${options?.groupAll ? "(" : ""}${
        isRegExp(p) ? p.source : p
      }${options?.groupAll ? ")" : ""}`,
    "",
  );

export const removeFlags = (regExp: RegExp): RegExp =>
  new RegExp(regExp.source);
