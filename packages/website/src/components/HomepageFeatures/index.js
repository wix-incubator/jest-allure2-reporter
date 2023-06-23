import React from 'react';
import clsx from 'clsx';
import Link from "@docusaurus/Link";

import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Detailed Test Reporting',
    Svg: require('@site/static/img/feature-reports.svg').default,
    description: (
      <>
        Generates test reports in Allure Report format, providing clear and
        concise representation of test results.
      </>
    ),
  },
  {
    title: 'Rich Metadata Addition',
    Svg: require('@site/static/img/feature-metadata.svg').default,
    description: (
      <>
        Enhance your tests by adding rich metadata
        including <Link to="/docs/api/descriptions/">descriptions</Link>,&nbsp;
        <Link to="/docs/api/steps">test steps</Link>,&nbsp;
        <Link to="/docs/api/parameters">parameters</Link>,&nbsp;
        and other <Link to="/docs/api">useful information</Link>.
      </>
    ),
  },
  {
    title: 'Flexible Test Categorization',
    Svg: require('@site/static/img/feature-classify.svg').default,
    description: (
      <>
        Offers multiple cross-sections of your test results by suite, story, package or defect category.
      </>
    ),
  },
  {
    title: 'Multimedia Attachments',
    Svg: require('@site/static/img/feature-attachments.svg').default,
    description: (
      <>
        Attach additional data like screenshots, logs, and more directly to your test report.
      </>
    ),
  },
  {
    title: 'Superior Compatibility',
    Svg: require('@site/static/img/feature-compatibility.svg').default,
    description: (
      <>
        Designed specifically for the modern Jest testing framework and fully compatible with the Jest Circus test runner.
      </>
    ),
  },
  {
    title: 'High Adaptability',
    Svg: require('@site/static/img/feature-adaptability.svg').default,
    description: (
      <>
        Regardless of whether you extend your test environment or not, Jest Allure 2 Reporter functions effectively.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
