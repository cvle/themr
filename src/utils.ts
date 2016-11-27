/**
 * @license
 * Copyright (C) 2016 Chi Vinh Le and contributors.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

function resolveCallbackDeep(subject: any, props: any) {
  for (const key in subject) {
    const kind = typeof subject[key];
    if (kind === "function") {
      subject[key] = subject[key](props);
    } else if (kind === "object") {
      resolveCallbackDeep(subject[key], props);
    }
  }
}

export function resolveCallback(subject: any, props: any, skip: string[] = []) {
  for (const key in subject) {
    if (skip.indexOf(key) > -1) { continue; }
    const kind = typeof subject[key];
    if (kind === "function") {
      subject[key] = subject[key](props);
    } else if (kind === "object") {
      resolveCallbackDeep(subject[key], props);
    }
  }
}
