/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/* tslint:disable:no-shadowed-variable */

/*
export type RulesCallback<T, TProps, TVars> = (props: TProps & { themeVars: TVars }) => T;
export type DynamicRules<T, TProps, TVars> = {
[P in keyof T]: DynamicRules<T[P], TProps, TVars> | RulesCallback<T[P], TProps, TVars>;
};
export type Rules<TRules, TProps, TVars> = () => DynamicRules<TRules, TProps, TVars>;
*/

import { createTransformer, Rules } from "../src/index";
import { withTheme } from "../src/bindings/react/withTheme";

import * as React from "react";
import jss from "jss";
import { StyleSheetOptions } from "jss";
import jssPlugin from "../src/plugins/jss";
import prefixerPlugin from "../src/plugins/inline-style-prefixer";
import callbackPlugin from "../src/plugins/callback";

const transformer = createTransformer(callbackPlugin(), jssPlugin({ jss }), prefixerPlugin());

type Theme = {
  dada: string;
};

type ThemeProps = {
  color: string;
};

type ThemeVars = {
  color: string;
};

const rules: Rules<ThemeProps, Theme, ThemeVars> = ({color}) => ({
  dada: "dada",
  styles: {
    button: {
      transform: "scale(0.5)",
    },
  },
  classes: {
    button: {
      color,
    },
    container: {
      color,
    },
  },
});

type ButtonProps = {
  primary: boolean;
};
type EnhancedButtonProps = {
  primary: boolean;
};

const Button: React.StatelessComponent<ButtonProps> = (props) => <div>hello</div>;
const Enhanced: React.ComponentClass<EnhancedButtonProps> =
  withTheme<ButtonProps, Theme, ThemeProps>(
    rules, {
      mapProps: (props) => ({
        color: props.primary ? "red" : "blue",
      }),
    },
  )(Button);
