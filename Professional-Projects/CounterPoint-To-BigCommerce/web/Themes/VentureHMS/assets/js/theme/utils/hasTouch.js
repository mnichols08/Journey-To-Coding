export default function hasTouch() {
  // http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}
