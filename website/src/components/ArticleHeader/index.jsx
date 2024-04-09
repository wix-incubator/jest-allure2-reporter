import { useDoc } from '@docusaurus/theme-common/internal';
import React from 'react';
import Link from "@docusaurus/Link";
import Admonition from '@theme/Admonition';

export function ArticleHeader() {
  const { frontMatter } = useDoc();

  if (!frontMatter.verified) {
    return (
      <Admonition type="caution" title="Work in Progress">
        This page may refer to functionality that is not yet released.
        The latest <code>beta</code> version of the reporter can be seen on <Link to="https://www.npmjs.com/package/jest-allure2-reporter?activeTab=versions">npm registry</Link>.
      </Admonition>
    );
  }
}
