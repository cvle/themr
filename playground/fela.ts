/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/* tslint:disable:no-shadowed-variable */

import { createTransformer } from "../src/transformer";
import { createThemeFactory } from "../src/themefactory";
import { createRenderer } from "fela";
import felaPlugin from "../src/plugins/fela";
import callbackPlugin from "../src/plugins/callback";

const themeFactory = createThemeFactory(() => ({
  dada: (props: any) => props.color,
  classes: {
    button: {
      color: (props: any) => props.color,
    },
  },
}));

const renderer = createRenderer();

const transformer = createTransformer(callbackPlugin(), felaPlugin({ renderer }));
console.log(themeFactory(transformer, { color: "red" }));
console.log(themeFactory(transformer, { color: "blue" }));
console.log(renderer.renderToString());
