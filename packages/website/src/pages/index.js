import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
// import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Logo from '@site/static/img/logo-full.svg';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx('hero__title', styles.title)}>{siteConfig.title}</h1>
        <p className={clsx('hero__subtitle', styles.tagline)}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Logo />
        </div>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs">
            Start a ride
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title={`Home`}
      description={`
jest-allure2-reporter is a comprehensive tool for generating Allure test reports from your Jest tests.
It offers broad support for an array of features that allow you to group and classify test cases, analyze your test environment, evaluate test history trends, and much more.`}>
      <HomepageHeader />
      <main>
      </main>
    </Layout>
  );
}
