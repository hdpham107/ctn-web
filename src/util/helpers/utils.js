export function os(ua) {
    var isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
    };
}


/* global document */

export const toggleFullScreenForElement = (element) => {
    const requestFullscreen =
      element.requestFullscreen ||
      element.webkitRequestFullscreen ||
      element.mozRequestFullScreen ||
      element.msRequestFullscreen;
  
    const exitFullscreen =
      document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.mozCancelFullScreen ||
      document.msExitFullscreen;
  
    const fullscreenElement =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;
  
    if (!fullscreenElement) {
      requestFullscreen.call(element);
    } else if (exitFullscreen) {
      exitFullscreen.call(document);
    }
  };
  
  export const getBodyColor = () => document.body.style.background;
  
  export const setBodyColor = (color) => {
    document.body.style.background = color;
  };
  
  
  export const getBrowser = () => {
    let browser = 'none';
    if (window.navigator.userAgent.match('Firefox') !== null) {
      // Firefox
      browser = 'mozilla';
    } else if (window.navigator.userAgent.match('Chrome') !== null) {
      browser = 'chrome-stable';
      if (window.navigator.userAgent.match('Electron') !== null) {
        browser = 'electron';
      }
    } else if (window.navigator.userAgent.match('Safari') !== null) {
      browser = 'safari';
    } else if (window.navigator.userAgent.match('AppleWebKit') !== null) {
      browser = 'safari';
    }
    return browser;
  };
  