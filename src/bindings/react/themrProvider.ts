/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import * as React from "react";

import { Transformer } from "../../transformer";

export interface ThemrContext<TVars> {
  themer: {
    vars: TVars;
    transformer: Transformer;
  };
}

export interface ThemrProviderProps<TVars> {
  vars?: TVars;
  transformer: Transformer;
}

export class ThemrProvider<TVars> extends
  React.Component<ThemrProviderProps<TVars>, {}> {
  public static childContextTypes: any = {
    themer: React.PropTypes.object,
  };

  private vars: TVars;
  private transformer: Transformer;

  constructor(props: ThemrProviderProps<TVars>) {
    super(props);
    this.vars = props.vars || {} as any;
    this.transformer = props.transformer;
  }

  public componentWillReceiveProps(nextProps: ThemrProviderProps<TVars>): void {
    this.vars = nextProps.vars || {} as any;
    this.transformer = nextProps.transformer;
  }

  public getChildContext(): ThemrContext<TVars> {
    return {
      themer: {
        vars: this.vars,
        transformer: this.transformer,
      },
    };
  }

  public render(): React.ReactElement<any> {
    return React.Children.only(this.props.children);
  }
}
