"use strict";
(globalThis["webpackChunkmatrix_shell_bench"] = globalThis["webpackChunkmatrix_shell_bench"] || []).push([[697],{

/***/ 97697:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Fireworks)
/* harmony export */ });
/* unused harmony export DefaultOptions */
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/*
 Copyright 2020 Nurjin Jafar
 Copyright 2020 Nordeck IT + Consulting GmbH.

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
  maxCount: 500,
  gravity: 0.05
};
class Fireworks {
  constructor(options) {
    var _this = this;
    _defineProperty(this, "options", void 0);
    _defineProperty(this, "context", null);
    _defineProperty(this, "supportsAnimationFrame", window.requestAnimationFrame);
    _defineProperty(this, "particles", []);
    _defineProperty(this, "isRunning", void 0);
    _defineProperty(this, "start", async function (canvas) {
      let timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
      if (!canvas) {
        return;
      }
      _this.isRunning = true;
      _this.context = canvas.getContext('2d');
      _this.supportsAnimationFrame.call(window, _this.updateWorld);
      if (timeout) {
        window.setTimeout(_this.stop, timeout);
      }
    });
    _defineProperty(this, "updateWorld", () => {
      if (!this.isRunning && this.particles.length === 0) return;
      this.update();
      this.paint();
      this.supportsAnimationFrame.call(window, this.updateWorld);
    });
    _defineProperty(this, "update", () => {
      if (this.particles.length < this.options.maxCount && this.isRunning) {
        this.createFirework();
      }
      const alive = [];
      for (let i = 0; i < this.particles.length; i++) {
        if (this.move(this.particles[i])) {
          alive.push(this.particles[i]);
        }
      }
      this.particles = alive;
    });
    _defineProperty(this, "paint", () => {
      if (!this.context || !this.context.canvas) return;
      this.context.globalCompositeOperation = 'destination-out';
      this.context.fillStyle = "rgba(0,0,0,0.5)";
      this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      this.context.globalCompositeOperation = 'lighter';
      for (let i = 0; i < this.particles.length; i++) {
        this.drawParticle(this.particles[i]);
      }
    });
    _defineProperty(this, "createFirework", () => {
      if (!this.context || !this.context.canvas) return;
      const width = this.context.canvas.width;
      const height = this.context.canvas.height;
      const xPoint = Math.random() * (width - 200) + 100;
      const yPoint = Math.random() * (height - 200) + 100;
      const nFire = Math.random() * 50 + 100;
      const color = "rgb(" + ~~(Math.random() * 200 + 55) + "," + ~~(Math.random() * 200 + 55) + "," + ~~(Math.random() * 200 + 55) + ")";
      for (let i = 0; i < nFire; i++) {
        const particle = {};
        particle.color = color;
        particle.w = particle.h = Math.random() * 4 + 1;
        particle.x = xPoint - particle.w / 2;
        particle.y = yPoint - particle.h / 2;
        particle.vx = (Math.random() - 0.5) * 10;
        particle.vy = (Math.random() - 0.5) * 10;
        particle.alpha = Math.random() * .5 + .5;
        const vy = Math.sqrt(25 - particle.vx * particle.vx);
        if (Math.abs(particle.vy) > vy) {
          particle.vy = particle.vy > 0 ? vy : -vy;
        }
        this.particles.push(particle);
      }
    });
    _defineProperty(this, "stop", async () => {
      this.isRunning = false;
    });
    _defineProperty(this, "drawParticle", particle => {
      if (!this.context || !this.context.canvas) {
        return;
      }
      this.context.save();
      this.context.beginPath();
      this.context.translate(particle.x + particle.w / 2, particle.y + particle.h / 2);
      this.context.arc(0, 0, particle.w, 0, Math.PI * 2);
      this.context.fillStyle = particle.color;
      this.context.globalAlpha = particle.alpha;
      this.context.closePath();
      this.context.fill();
      this.context.restore();
    });
    _defineProperty(this, "move", particle => {
      particle.x += particle.vx;
      particle.vy += this.options.gravity;
      particle.y += particle.vy;
      particle.alpha -= 0.01;
      return !(particle.x <= -particle.w || particle.x >= screen.width || particle.y >= screen.height || particle.alpha <= 0);
    });
    this.options = _objectSpread(_objectSpread({}, DefaultOptions), options);
  }
}

/***/ })

}]);
//# sourceMappingURL=697.js.map