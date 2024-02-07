export const GOOGLE_ANALYTICS_TRACKING_ID = 'G-VSB2S2GNN2'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag('config', GOOGLE_ANALYTICS_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, ...agrs }) => {
  window.gtag('event', action, agrs)
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/exceptions
export const exception = ({ description, fatal }) => {
  window.gtag('event', 'exception', {
    description,
    fatal,
  })
}
