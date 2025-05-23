/*
 * Copyright 2025 Hypergiant Galactic Systems Inc. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// @ts-nocheck
import { Children, type ReactNode, isValidElement } from 'react';

type ContainsExactChildrenProps = {
  componentName: string;
  children: ReactNode | ReactNode[];
  restrictions: Record<string, number>;
};

export function containsExactChildren({
  children,
  componentName,
  restrictions,
}: ContainsExactChildrenProps) {
  const childrenComponents = Children.toArray(children);

  if (!childrenComponents.every(isValidElement)) {
    throw new Error(`<${componentName}> received invalid children.`);
  }

  const restrictionResults = childrenComponents.reduce(
    (acc, child) => ({
      // biome-ignore lint/performance/noAccumulatingSpread: this is fine.
      ...acc,
      [child.type.displayName]: acc[child.type.displayName] - 1,
    }),
    restrictions,
  );

  const missingComponents = Object.entries(restrictionResults).filter(
    ([, value]) => value !== 0,
  );

  if (missingComponents.length !== 0) {
    const restrictionString = missingComponents
      .map(([key, value]) => `${value} of <${key}>`)
      .join(', ');

    throw new Error(
      `<${componentName}> is missing the following: ${restrictionString}`,
    );
  }
}

/**
 * I look for svgIcons exported from the @accelint/icons library
 * and ensure that they are wrapped in an Icon component in order
 * to get the classes and styles they need in context.
 *
 * Using isValidElement means we will filter out strings, boolean, etc
 * that are valid nodes but not elements.
 *
 * @example
 *   expectsIconWrapper({
 *     children,
 *     componentName: Button.displayName,
 *   });
 *
 *
 * @param children the children of the calling component
 * @param componentName the displayName of the calling component
 */
export function expectsIconWrapper({ children, componentName }) {
  const childrenComponents = Children.toArray(children);

  childrenComponents.map((child) => {
    if (isValidElement(child)) {
      // icons should never be a direct child of the parent
      if (child.type.name?.startsWith('Svg')) {
        throw new Error(
          `${componentName} is using an icon without the required Icon wrapper`,
        );
      }
    }
  });
}
