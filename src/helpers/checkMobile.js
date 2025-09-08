export default function checkMobile() {
  const devices = {
    android: () => navigator.userAgent.match(/Android/i),

    blackberry: () => navigator.userAgent.match(/BlackBerry/i),

    ios: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),

    opera: () => navigator.userAgent.match(/Opera Mini/i),

    windows: () => navigator.userAgent.match(/IEMobile/i)
  };

  // Check for touch capability + small screen (covers cases where user agent detection fails)
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 1024;

  return (
    devices.android() ||
    devices.blackberry() ||
    devices.ios() ||
    devices.opera() ||
    devices.windows() ||
    (hasTouch && isSmallScreen)
  );
}
