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

export type Options = {
  skip: string[];
};

const defaults: () => Options = () => ({
  skip: [],
});

const plugin: PluginFactory<Options> = (options = defaults()) =>
  ({rules, props, runtime}) => {
    const {skip} = options;
    resolveCallback(rules, props, skip);
  };

export default plugin;
