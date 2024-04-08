import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Logo from '@site/static/img/logo-full.svg';

import styles from './index.module.css';
import Translate, { translate } from "@docusaurus/Translate";

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className={clsx('hero__title', styles.title)}>
              <Translate id="homepage.title" description="The project name">jest-allure2-reporter</Translate>
            </h1>
            <p className={clsx('hero__subtitle', styles.tagline)}>
              <Translate id="homepage.tagline" description="The project tagline under the name">
                The idiomatic Jest reporter for Allure Framework
              </Translate>
            </p>
          </div>
        </div>
        <div className={clsx('row', styles.heroTop)}>
          <div className="col col--8">
            <Logo />
          </div>
          <div className={clsx('col col--4', styles.heroRight)}>
            <p className={styles.heroText}>
              <Translate id="homepage.heroText" description="What the project does">
                Jest Allure 2 Reporter is an extension for Jest that
                generates test reports in the Allure Report format,
                a flexible and feature-rich reporting tool.
              </Translate>
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/docs">
                <Translate id="homepage.getStarted" description="CTA button to get to the documentation">
                  Start a ride
                </Translate>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title={translate({ id: 'homepage.meta.title', message: 'Home' })}
      description={translate({ id: 'homepage.meta.description', message: `\
jest-allure2-reporter is a comprehensive tool for generating Allure test reports from your Jest tests.
It offers broad support for an array of features that allow you to group and classify test cases, analyze your test environment, evaluate test history trends, and much more.` })}
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
