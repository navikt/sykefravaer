import Logger from 'nav-logger';
import { getCookie } from 'digisyfo-npm';

export default new Logger({
    url: `${window.APP_SETTINGS.REST_ROOT}/logging`,
    fetchConfig: (config) => {
        config.headers.append('X-XSRF-TOKEN', getCookie('XSRF-TOKEN-SYFOREST'));
        config.headers.append('NAV_CSRF_PROTECTION', getCookie('NAV_CSRF_PROTECTION'));
        return { ...config, credentials: 'include' };
    },
});
