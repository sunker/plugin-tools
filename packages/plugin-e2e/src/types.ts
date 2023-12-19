import { Locator, PlaywrightTestArgs } from '@playwright/test';

import { E2ESelectors } from './e2e-selectors/types';

/**
 * The context object passed to page object models
 */
export type PluginTestCtx = { grafanaVersion: string; selectors: E2ESelectors } & Pick<
  PlaywrightTestArgs,
  'page' | 'request'
>;

/**
 * The data source object
 */
export interface DataSource<T = any> {
  id?: number;
  editable?: boolean;
  uid?: string;
  orgId?: number;
  name?: string;
  type: string;
  access?: string;
  url?: string;
  database?: string;
  isDefault?: boolean;
  jsonData?: T;
  secureJsonData?: T;
}

/**
 * The YAML provision file parsed to a javascript object
 */
export type ProvisionFile<T = DataSource> = {
  datasources: Array<DataSource<T>>;
};

export type CreateDataSourceArgs = {
  /**
   * The data source to create
   */
  datasource: DataSource;
};

export type CreateDataSourcePageArgs = {
  /**
   * The data source type to create
   */
  type: string;
  /**
   * The data source name to create
   */
  name?: string;

  /**
   * Set this to false to delete the data source via Grafana API after the test. Defaults to true.
   */
  deleteDataSourceAfterTest?: boolean;
};

export type RequestOptions = {
  /**
   * Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout. The default value can
   * be changed by using the
   * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
   * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
   */
  timeout?: number;
};

export interface TimeRangeArgs {
  /**
   * The from time
   * @example 'now-6h'
   * @example '2020-01-01 00:00:00'
   */
  from: string;
  /**
   * The to time
   * @example 'now'
   * @example '2020-01-01 00:00:00'
   */
  to: string;
  /**
   * The time zone
   * @example 'utc'
   * @example 'browser'
   */
  zone?: string;
}

export type GotoDashboardArgs = {
  /**
   * The uid of the dashboard to go to
   */
  uid?: string;
  /**
   * The time range to set
   */
  timeRange?: TimeRangeArgs;
  /**
   * Query parameters to add to the url
   */
  queryParams?: URLSearchParams;
};

export type ReadProvisionArgs = {
  /**
   * The path, relative to the provisioning folder, to the dashboard json file
   */
  filePath: string;
};

export type NavigateOptions = {
  /**
   * Referer header value.
   */
  referer?: string;

  /**
   * Maximum operation time in milliseconds. Defaults to `0` - no timeout.
   */
  timeout?: number;

  /**
   * When to consider operation succeeded, defaults to `load`. Events can be either:
   * - `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
   * - `'load'` - consider operation to be finished when the `load` event is fired.
   * - `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for
   *   at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
   * - `'commit'` - consider operation to be finished when network response is received and the document started
   *   loading.
   */
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit';

  /**
   * Query parameters to add to the url. Optional
   */
  queryParams?: URLSearchParams;
};

export type TriggerQueryOptions = {
  /**
   * Set this to true to skip waiting for the response. Defaults to false.
   */
  skipWaitForResponse: boolean;
};

/**
 * Panel visualization types
 */
export type Visualization =
  | 'Alert list'
  | 'Bar gauge'
  | 'Clock'
  | 'Dashboard list'
  | 'Gauge'
  | 'Graph'
  | 'Heatmap'
  | 'Logs'
  | 'News'
  | 'Pie Chart'
  | 'Plugin list'
  | 'Polystat'
  | 'Stat'
  | 'Table'
  | 'Text'
  | 'Time series'
  | 'Worldmap Panel';

export type AlertVariant = 'success' | 'warning' | 'error' | 'info';

/**
 * Implement this interface in a POM in case you want to enable the `toHavePanelError` matcher for the page.
 * Only applicable to pages that have one panel only, such as the explore page or panel edit page.
 *
 * @internal
 */
export interface PanelError {
  ctx: PluginTestCtx;
  getPanelError: () => Locator;
}

export interface AlertPageOptions {
  /**
   * Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout. The default value can
   * be changed by using the
   * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
   * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
   */
  timeout?: number;
  /**
   * Matches elements containing an element that matches an inner locator. Inner locator is queried against the outer
   * one. For example, `article` that has `text=Playwright` matches `<article><div>Playwright</div></article>`.
   *
   * Note that outer and inner locators must belong to the same frame. Inner locator must not contain {@link
   * FrameLocator}s.
   */
  has?: Locator;

  /**
   * Matches elements that do not contain an element that matches an inner locator. Inner locator is queried against the
   * outer one. For example, `article` that does not have `div` matches `<article><span>Playwright</span></article>`.
   *
   * Note that outer and inner locators must belong to the same frame. Inner locator must not contain {@link
   * FrameLocator}s.
   */
  hasNot?: Locator;

  /**
   * Matches elements that do not contain specified text somewhere inside, possibly in a child or a descendant element.
   * When passed a [string], matching is case-insensitive and searches for a substring.
   */
  hasNotText?: string | RegExp;

  /**
   * Matches elements containing specified text somewhere inside, possibly in a child or a descendant element. When
   * passed a [string], matching is case-insensitive and searches for a substring. For example, `"Playwright"` matches
   * `<article><div>Playwright</div></article>`.
   */
  hasText?: string | RegExp;
}

/**
 * @internal
 */
export interface AlertPage {
  ctx: PluginTestCtx;
  hasAlert: (severity: AlertVariant, options?: AlertPageOptions) => Promise<Locator>;
}
