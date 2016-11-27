/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as createHash from "murmurhash-js/murmurhash3_gc";
import * as prefix from "inline-style-prefixer/static";

import { PluginFactory, Task } from "../plugin";

const ns = "inline-style-prefixer-static";

type Runtime = {
  cache: { [hash: number]: any };
};

export type Options = {};

const plugin: PluginFactory<Options> = (options = {}) =>
  ({rules: {styles}, runtime}) => {
    if (!runtime[ns]) { runtime[ns] = { cache: {} } as Runtime; }
    if (!styles) { return; }
    const pfxRuntime: Runtime = runtime[ns];
    for (const name in styles) {
      const hash = createHash(JSON.stringify(styles[name]));
      let prefixed = pfxRuntime.cache[hash];
      if (!prefixed) {
        prefixed = prefix(styles[name]);
        pfxRuntime.cache[hash] = prefixed;
      }
      styles[name] = prefixed;
    }
  };

export default plugin;
