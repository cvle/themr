/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { PluginFactory, Task } from "../plugin";
import { resolveCallback } from "../utils";

const ns = "fela";

type Runtime = {};

export type PluginOptions = {
  skip: string[];
};

const defaults: () => PluginOptions = () => ({
  skip: [],
});

const plugin: PluginFactory<PluginOptions> = (pluginOptions = defaults()) =>
  ({rules, props, vars, runtime}) => {
    const {skip} = pluginOptions;
    resolveCallback(rules, props, vars, skip);
  };

export default plugin;
