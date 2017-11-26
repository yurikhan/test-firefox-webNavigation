browser.webNavigation.onCreatedNavigationTarget &&
browser.webNavigation.onCreatedNavigationTarget.addListener(details =>
  console.log('onCreatedNavigationTarget', details));

browser.webNavigation.onBeforeNavigate &&
browser.webNavigation.onBeforeNavigate.addListener(details =>
  console.log('onBeforeNavigate', details));

browser.webNavigation.onCommitted &&
browser.webNavigation.onCommitted.addListener(details => {
  console.log('onCommitted', details);
  return browser.tabs.insertCSS(details.tabId, {
    code: 'body { border: 10px solid red; }',
    frameId: details.frameId,
    runAt: 'document_start'
  })
  .then(() => console.log('injected for', details))
  .catch(e => console.log(details, e));
})

browser.webNavigation.onDOMContentLoaded &&
browser.webNavigation.onDOMContentLoaded.addListener(details =>
  console.log('onDOMContentLoaded', details));

browser.webNavigation.onCompleted &&
browser.webNavigation.onCompleted.addListener(details =>
  console.log('onCompleted', details));

browser.browserAction.onClicked.addListener(tab =>
  browser.webNavigation.getAllFrames({tabId: tab.id})
  .then(frames => console.log('getAllFrames returns', frames)));
