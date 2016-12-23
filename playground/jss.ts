/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/* tslint:disable:no-shadowed-variable */

import { createTransformer } from "../src/transformer";
import { createThemeFactory } from "../src/themeFactory";
import jss from "jss";
import jssPlugin from "../src/plugins/jss";
import prefixerPlugin from "../src/plugins/inline-style-prefixer";
import callbackPlugin from "../src/plugins/callback";

const themeFactory = createThemeFactory(() => ({
  dada: (props: any) => props.color,
  styles: {
    button: {
      transform: "scale(0.5)",
    },
  },
  classes: {
    button: {
      color: (props: any) => props.color,
    },
    container: {
      color: (props: any) => props.color,
    },
  },
}));

const transformer = createTransformer(callbackPlugin(), jssPlugin({ jss }), prefixerPlugin());
console.log(themeFactory(transformer, { color: "red" }));
console.log(themeFactory(transformer, { color: "blue" }));
console.log(jss.sheets.toString());
