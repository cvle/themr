/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Task, Plugin } from "./plugin";

export type Transformer = (id: number, rules: () => any, options?: any, props?: any, vars?: any) => any;

export function createTransformer(...plugins: Plugin[]): Transformer {
  const runtime: { [id: number]: any } = {};
  return (id: number, rules: any, options = {}, props = {}, vars = {}) => {
    if (!runtime[id]) { runtime[id] = {}; }
    const task: Task = {
      id, options,
      props,
      vars,
      rules: rules(props, vars),
      runtime: runtime[id],
    };
    plugins.forEach((t) => t(task));
    if (!task.rules.styles) { task.rules.styles = {}; }
    if (!task.rules.classes) { task.rules.classes = {}; }
    if (!task.rules.themes) { task.rules.themes = {}; }
    return task.rules;
  };
}
