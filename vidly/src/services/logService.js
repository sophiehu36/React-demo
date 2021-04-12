// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";

function init() {
    // Sentry.init({
    //     dsn:
    //         "https://5ae284060ac9449d9e6b838f47decd3e@o569044.ingest.sentry.io/5714501",
    //     integrations: [new Integrations.BrowserTracing()],

    //     // Set tracesSampleRate to 1.0 to capture 100%
    //     // of transactions for performance monitoring.
    //     // We recommend adjusting this value in production
    //     tracesSampleRate: 1.0,
    // });
}

function log(error) {
    console.log(error)
}

export default {
    init,
    log
};
