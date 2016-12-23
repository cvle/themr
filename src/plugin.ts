/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Options } from "./transformer";

export interface Task {
  rules: any;
  options: Options;
  id: number;
  props: any;
  vars: any;
  runtime: { [plugin: string]: any };
}

export type Plugin = (task: Task) => void;
export type PluginFactory<TOptions> = (options?: TOptions) => Plugin;
