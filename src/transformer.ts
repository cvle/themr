/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Task, Plugin } from "./plugin";

export type Rules<TProps, TTheme, TVars> = (props?: TProps, vars?: TVars) => TTheme;
export type Transformer = (rules: Rules<any, any, any>, options?: Options, props?: any, vars?: any) => any;
export type Options = {
  name?: string;
  index?: number;
  global?: boolean;
};

export function createTransformer(...plugins: Plugin[]): Transformer {
  // TODO: Use WeakMap.
  const rulesRegistry: Array<Rules<any, any, any>> = [];
  const runtime: { [id: number]: any } = {};
  return (rules: Rules<any, any, any>, options = {}, props = {}, vars = {}) => {
    let id = rulesRegistry.indexOf(rules);
    if (id < 0) { id = rulesRegistry.push(rules); }
    if (!runtime[id]) { runtime[id] = {}; }
    const task: Task = {
      id, options,
      props,
      vars,
      rules: rules ? rules(props, vars) : {},
      runtime: runtime[id],
    };
    plugins.forEach((t) => t(task));
    if (!task.rules.styles) { task.rules.styles = {}; }
    if (!task.rules.classes) { task.rules.classes = {}; }
    if (!task.rules.themes) { task.rules.themes = {}; }
    return task.rules;
  };
}
