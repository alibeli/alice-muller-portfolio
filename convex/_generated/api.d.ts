/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as lib_emails_sendEmail from "../lib/emails/sendEmail.js";
import type * as lib_normalizeEmail from "../lib/normalizeEmail.js";
import type * as lib_notifyAdmins from "../lib/notifyAdmins.js";
import type * as lib_portfolioViewEmail from "../lib/portfolioViewEmail.js";
import type * as portfolioAccess from "../portfolioAccess.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "lib/emails/sendEmail": typeof lib_emails_sendEmail;
  "lib/normalizeEmail": typeof lib_normalizeEmail;
  "lib/notifyAdmins": typeof lib_notifyAdmins;
  "lib/portfolioViewEmail": typeof lib_portfolioViewEmail;
  portfolioAccess: typeof portfolioAccess;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
