/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as React from "react";

import { ThemrProvider, ThemrContext } from "./themrProvider";
import { Transformer, Rules } from "../../index";
import { Options } from "../../transformer";
import { mergeTheme } from "./utils";

export type WithThemeProps<TThemeProps, TTheme> = Options & {
  themeRules?: Rules<TThemeProps, TTheme, any>;
};

export type ThemeOptions<TProps, TThemeProps> = Options & {
  mapProps?: (props: TProps) => TThemeProps,
};

export type DecoratorTarget<TProps> = React.StatelessComponent<TProps> | React.ComponentClass<TProps>;
export type Decorator<TInner, TOuter> = (target: DecoratorTarget<TInner>) => React.ComponentClass<TOuter>;

export interface ThemeAttributes<TTheme> {
  theme?: TTheme;
}

let indexCounter = -10000;

export function withTheme<
  TProps extends WithThemeProps<TThemeProps, TTheme>,
  TTheme,
  TThemeProps>(
  options: ThemeOptions<TProps, TThemeProps> = {},
): Decorator<TProps & { theme?: TTheme }, TProps> {
  if (!(options as any).index) {
    (options as any).index = indexCounter++;
  }
  const index = indexCounter++;
  return (TargetComponent: DecoratorTarget<TProps & { theme?: TTheme }>) => {
    const enhanced = class WithTheme extends React.Component<TProps, void> {
      public static contextTypes: any = ThemrProvider.childContextTypes;

      public context: ThemrContext<any>;
      private theme: any;

      constructor(props: TProps, context: ThemrContext<any>) {
        super(props, context);
        this.theme = computeTheme(props.themeRules, props, context, options);
      }

      public componentWillReceiveProps(nextProps: TProps): void {
        this.theme = computeTheme(nextProps.themeRules, nextProps, this.context, options);
      }

      public render(): React.ReactElement<any> {
        const {themeRules: _, ...rest} = (this.props as any);
        return <TargetComponent {...rest} theme={this.theme} />;
      }
    };

    return enhanced;
  };
}

function computeTheme(
  rules: Rules<any, any, any>,
  props: any,
  context: ThemrContext<any>,
  options: ThemeOptions<any, any>,
) {
  props = options.mapProps ? options.mapProps(props) : {};
  const { vars, transformer } = context.themer;
  const customTheme = props.theme;
  const transformed = transformer(rules, options, props, vars);
  return customTheme ? mergeTheme(transformed, customTheme) : transformed;
}
