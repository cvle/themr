/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as createHash from "murmurhash-js/murmurhash3_gc";
import { Renderer, createRenderer } from "fela";

import { PluginFactory, Task } from "../plugin";
import { resolveCallback } from "../utils";

const ns = "fela";

type Runtime = {
  cache: { [hash: number]: string };
};

export type PluginOptions = {
  renderer?: Renderer;
};

const defaults: () => PluginOptions = () => ({
  renderer: createRenderer(),
});

const plugin: PluginFactory<PluginOptions> = (pluginOptions = defaults()) =>
  ({rules: {classes}, runtime}) => {
    if (!classes) { return; }
    if (!runtime[ns]) { runtime[ns] = { cache: {} } as Runtime; }
    const felaRuntime: Runtime = runtime[ns];
    const {renderer} = pluginOptions;

    for (const name in classes) {
      const hash = createHash(JSON.stringify(classes[name]));
      let classNames = felaRuntime.cache[hash];
      if (!classNames) {
        classNames = renderer.renderRule(() => classes[name]);
        felaRuntime.cache[hash] = classNames;
      }
      classes[name] = classNames;
    }
  };

export default plugin;
