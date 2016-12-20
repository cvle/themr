/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Transformer } from "./transformer";

export type ThemeFactory<TTheme, TProps, TVars> =
  (transformer: Transformer, props: TProps, vars?: TVars) => TTheme;

let id = 0;

export function createThemeFactory<
  TTheme,
  TProps,
  TVars,
  TRules extends (props?: TProps, vars?: TVars) => any,
  TOptions>(
  rules: TRules,
  options: TOptions | {} = {},
): ThemeFactory<TTheme, TProps, TVars> {
  id++;
  return (transformer, props, vars = {} as any) =>
    transformer(id, rules, options, props, vars);
}
