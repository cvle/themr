/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as createHash from "murmurhash-js/murmurhash3_gc";
import { default as defaultJSS, JSS, StyleSheet, StyleSheetOptions } from "jss";

import { PluginFactory, Task } from "../plugin";

const ns = "jss";

type Runtime = {
  cache: { [hash: number]: any };
};

export type Options = {
  jss?: JSS,
};

const defaults: () => Options = () => ({
  jss: defaultJSS,
});

const plugin: PluginFactory<Options> = (pluginOptions = defaults()) =>
  ({rules, options, runtime}) => {
    if (!rules.classes) { return; }
    if (!runtime[ns]) { runtime[ns] = { cache: {} } as Runtime; }
    const jssRuntime: Runtime = runtime[ns];
    const {jss} = pluginOptions;

    const hash = createHash(JSON.stringify(rules.classes));
    let classNames = jssRuntime.cache[hash];
    if (!classNames) {
      classNames = jss.createStyleSheet(rules.classes, options[ns]).classes;
      jssRuntime.cache[hash] = classNames;
    }
    rules.classes = classNames;
  };

export default plugin;
