/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as createHash from "murmurhash-js/murmurhash3_gc";
import * as Prefixer from "inline-style-prefixer";

import { PluginFactory, Task } from "../plugin";

const ns = "inline-style-prefixer";

type Runtime = {
  cache: { [hash: number]: any };
};

export type Options = {
  prefixer?: any,
};

const defaults: () => Options = () => ({
  prefixer: new Prefixer(),
});

const plugin: PluginFactory<Options> = (options = defaults()) =>
  ({rules: {styles}, runtime}) => {
    if (!runtime[ns]) { runtime[ns] = { cache: {} } as Runtime; }
    if (!styles) { return; }
    const pfxRuntime: Runtime = runtime[ns];
    const { prefixer } = options;
    for (const name in styles) {
      const hash = createHash(JSON.stringify(styles[name]));
      let prefixed = pfxRuntime.cache[hash];
      if (!prefixed) {
        prefixed = prefixer.prefix(styles[name]);
        pfxRuntime.cache[hash] = prefixed;
      }
      styles[name] = prefixed;
    }
  };

export default plugin;
