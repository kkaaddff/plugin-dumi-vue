import { AnchorLink } from 'dumi/theme';
import type { FC } from 'react';
import React from 'react';
import './SlugList.less';

type Slug = {
  heading: string;
  value: string;
  depth: number;
};

const SlugsList: FC<{ slugs: Slug[]; className?: string }> = ({
  slugs,
  ...props
}) => {
  return (
    <ul role="slug-list" {...props}>
      {slugs
        .filter(({ depth }) => depth > 1 && depth < 4)
        .map((slug) => (
          <li key={slug.heading} title={slug.value} data-depth={slug.depth}>
            <AnchorLink
              to={`#${slug.heading}`}
              className={`__dumi-anchor-depth-${slug.depth}`}
            >
              <span>{slug.value}</span>
            </AnchorLink>
          </li>
        ))}
    </ul>
  );
};

export default SlugsList;
