/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as deepExtend from "deep-extend";

export function mergeTheme(a: any, b: any): any {
  const theme = { ...a };
  const customTheme = { ...b };
  delete customTheme.classes;
  deepExtend(theme, customTheme);

  // classes get appended instead of overwritten.
  const classes: { [className: string]: string } = b.classes;
  if (classes) {
    for (const key in classes) {
      if (theme.classes[key] === undefined) {
        theme.classes[key] = classes[key];
        continue;
      }
      theme.classes[key] += " " + classes[key];
    }
  }
  return theme;
}
