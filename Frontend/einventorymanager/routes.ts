/**
 * Use for accessing routes that needs user authentication
 * @type {strin[]}
 */
export const protectedRoutes: string[] = [
    '/user',
    '/organization',
];

/**
 * Use for accessing organization routes
 * Needs user authentication
 * Accessible only if user is path or the organization
 * @type {strin[]}
 */
export const organizationRoutes: string[] = [
    '/organization/',
];


/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/login",
    "/signup",
    "/error",
    "/password-reset",
    "/new-password"
];


/**
 * An array of routes that are used for access to public pages
 * These routes are supposed to be accessible with or without authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/contact",
    "/about",
    "/story",
    "/blog",
];


/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_HOME_REDIRECT = "/";
