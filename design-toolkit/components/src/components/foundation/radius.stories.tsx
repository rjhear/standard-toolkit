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

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundation/Radius',
  tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj;

type RadiusInfo = {
  name: string;
  rounded: string;
};

const radii: RadiusInfo[] = [
  {
    name: 'radius/none',
    rounded: 'rounded-none',
  },
  {
    name: 'radius/small',
    rounded: 'rounded-small',
  },
  {
    name: 'radius/medium',
    rounded: 'rounded-medium',
  },
  {
    name: 'radius/large',
    rounded: 'rounded-large',
  },
  {
    name: 'radius/round',
    rounded: 'rounded-round',
  },
];

const RadiusDisplay = (radius: RadiusInfo) => {
  const rootElement = document.documentElement;

  return (
    <div className='flex items-center gap-l' key={radius.name}>
      <div
        className={`block h-[40px] w-[80px] border border-interactive-hover ${radius.rounded}`}
      />
      <div className='fg-interactive-default flex flex-col gap-s font-display text-body-xs'>
        <span className='inline-flex gap-s'>
          {radius.rounded}
          <span className='fg-disabled text-body-xxs'>
            (
            {getComputedStyle(rootElement).getPropertyValue(
              `--${radius.name.replace('/', '-')}`,
            )}
            )
          </span>
        </span>

        <span className='fg-default-dark'>Figma: {radius.name}</span>
      </div>
    </div>
  );
};

export const Radius: Story = {
  globals: { backgrounds: { value: '#000000' } },
  render: () => (
    <div className='flex flex-col gap-xl'>
      <div className='flex flex-col gap-m'>
        <h1 className='fg-interactive-default text-header-xl'>Radius</h1>
        <p className='fg-interactive-hover-light text-body-s'>
          These are the contextualized spacing values available for use in any
          Figma design file. It can be applied to components/elements as padding
          and/or gap for listing patterns.
        </p>
      </div>
      <div className='flex flex-col gap-y-xxl'>{radii.map(RadiusDisplay)}</div>
    </div>
  ),
};
