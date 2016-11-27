/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Task, Plugin } from "./plugin";

export type Transformer = (id: number, rules: () => any, options?: any, props?: any) => any;

export function createTransformer(...plugins: Plugin[]): Transformer {
  const runtime: { [id: number]: any } = {};
  return (id: number, rules: any, options = {}, props = {}) => {
    if (!runtime[id]) { runtime[id] = {}; }
    const task: Task = {
      id, options, props,
      rules: rules(),
      runtime: runtime[id],
    };
    plugins.forEach((t) => t(task));
    return task.rules;
  };
}
