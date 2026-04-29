export default function checkMobile() {
  const devices = {
    android: () => navigator.userAgent.match(/Android/i),

    blackberry: () => navigator.userAgent.match(/BlackBerry/i),

    ios: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),

    opera: () => navigator.userAgent.match(/Opera Mini/i),

    windows: () => navigator.userAgent.match(/IEMobile/i)
  };

  // coarse pointer = touch-primary device (phone or tablet, any orientation/size)
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  return (
    devices.android() ||
    devices.blackberry() ||
    devices.ios() ||
    devices.opera() ||
    devices.windows() ||
    (hasTouch && isCoarsePointer)
  );
}
