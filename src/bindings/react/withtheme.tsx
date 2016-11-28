/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as React from "react";

import { ThemerProvider, ThemerContext } from "./themerprovider";
import { ThemeFactory, Transformer } from "../../index";
import { mergeTheme } from "./utils";

export type DecoratorTarget<TProps> = React.StatelessComponent<TProps> | React.ComponentClass<TProps>;
export type Decorator<TInner, TOuter> = (target: DecoratorTarget<TInner>) => React.ComponentClass<TOuter>;

export interface ThemeAttributes<TTheme> {
  theme?: TTheme;
}

export function withTheme<
  TProps extends { theme?: TTheme },
  TTheme,
  TThemeProps>(
  themeFactory: ThemeFactory<TTheme, TThemeProps, any>,
  mapPropsToTheme?: (props: TProps) => TThemeProps,
): Decorator<TProps, TProps> {
  return (TargetComponent: DecoratorTarget<TProps>) => {
    const enhanced = class WithTheme extends React.Component<TProps, void> {
      public static contextTypes: any = ThemerProvider.childContextTypes;

      public context: ThemerContext<any>;
      private theme: any;

      constructor(props: TProps, context: ThemerContext<any>) {
        super(props, context);
        this.theme = computeTheme(themeFactory, mapPropsToTheme, props, context);
      }

      public componentWillReceiveProps(nextProps: TProps): void {
        this.theme = computeTheme(themeFactory, mapPropsToTheme, nextProps, this.context);
      }

      public render(): React.ReactElement<any> {
        return <TargetComponent {...this.props} theme={this.theme} />;
      }
    };

    return enhanced;
  };
}

function computeTheme(
  themeFactory: ThemeFactory<any, any, any>,
  mapPropsToTheme: (props: any) => any,
  props: { theme?: any },
  context: ThemerContext<any>,
) {
  const { vars, transformer } = context.themer;
  const customTheme = props.theme;
  const themeProps = mapPropsToTheme ? mapPropsToTheme(props) : {};
  const transformed = themeFactory(transformer, themeProps, vars);
  return customTheme ? mergeTheme(transformed, customTheme) : transformed;
}
