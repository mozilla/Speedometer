"use strict";
(globalThis["webpackChunkmatrix_shell_bench"] = globalThis["webpackChunkmatrix_shell_bench"] || []).push([[633],{

/***/ 47633:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Snowfall)
/* harmony export */ });
/* unused harmony export DefaultOptions */
/* harmony import */ var _utils_arrays__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49958);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/*
 Copyright 2020 The Matrix.org Foundation C.I.C.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */


const DefaultOptions = {
  maxCount: 200,
  gravity: 0.05,
  maxDrift: 5
};
const KEY_FRAME_INTERVAL = 15; // 15ms, roughly

class Snowfall {
  constructor(options) {
    var _this = this;
    _defineProperty(this, "options", void 0);
    _defineProperty(this, "context", null);
    _defineProperty(this, "particles", []);
    _defineProperty(this, "lastAnimationTime", void 0);
    _defineProperty(this, "isRunning", void 0);
    _defineProperty(this, "start", async function (canvas) {
      let timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
      if (!canvas) {
        return;
      }
      _this.context = canvas.getContext('2d');
      _this.particles = [];
      const count = _this.options.maxCount;
      while (_this.particles.length < count) {
        _this.particles.push(_this.resetParticle({}, canvas.width, canvas.height));
      }
      _this.isRunning = true;
      requestAnimationFrame(_this.renderLoop);
      if (timeout) {
        window.setTimeout(_this.stop, timeout);
      }
    });
    _defineProperty(this, "stop", async () => {
      this.isRunning = false;
    });
    _defineProperty(this, "resetParticle", (particle, width, height) => {
      particle.x = Math.random() * width;
      particle.y = Math.random() * -height;
      particle.xCol = particle.x;
      particle.diameter = Math.random() * 7 + 4;
      particle.maximumDrift = Math.random() * this.options.maxDrift + 3.5;
      particle.gravity = this.options.gravity + Math.random() * 6 + 4;
      return particle;
    });
    _defineProperty(this, "renderLoop", () => {
      if (!this.context || !this.context.canvas) {
        return;
      }
      if (this.particles.length === 0) {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      } else {
        const timeDelta = Date.now() - this.lastAnimationTime;
        if (timeDelta >= KEY_FRAME_INTERVAL || !this.lastAnimationTime) {
          // Clear the screen first
          this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
          this.lastAnimationTime = Date.now();
          this.animateAndRenderSnowflakes();
        }
        requestAnimationFrame(this.renderLoop);
      }
    });
    this.options = _objectSpread(_objectSpread({}, DefaultOptions), options);
  }
  animateAndRenderSnowflakes() {
    if (!this.context || !this.context.canvas) {
      return;
    }
    const height = this.context.canvas.height;
    for (const particle of (0,_utils_arrays__WEBPACK_IMPORTED_MODULE_0__/* .arrayFastClone */ .iP)(this.particles)) {
      particle.y += particle.gravity;

      // We treat the drift as a sine function to have a more fluid-like movement instead
      // of a pong-like movement off walls of the X column. This means that for
      // $x=A\sin(\frac{2\pi}{P}y)$ we use the `maximumDrift` as the amplitude (A) and a
      // large multiplier to create a very long waveform through P.
      const peakDistance = 75 * particle.maximumDrift;
      const PI2 = Math.PI * 2;
      particle.x = particle.maximumDrift * Math.sin(PI2 / peakDistance * particle.y);
      particle.x += particle.xCol; // bring the particle to the right place

      const radius = particle.diameter / 2;
      this.context.save();
      this.context.beginPath();
      this.context.ellipse(particle.x, particle.y, radius, radius, 0, 0, 360);
      this.context.fillStyle = '#eaeaea'; // grey so it shows up on the light theme
      this.context.fill();
      this.context.closePath();
      this.context.restore();

      // Remove any dead snowflakes
      const maxBounds = radius * 4; // make sure it's *really* off screen
      if (particle.y > height + maxBounds) {
        const idx = this.particles.indexOf(particle);
        this.particles.splice(idx, 1);
      }
    }
  }
}

/***/ })

}]);
//# sourceMappingURL=633.js.map