"use strict";
(globalThis["webpackChunkmatrix_shell_bench"] = globalThis["webpackChunkmatrix_shell_bench"] || []).push([[570],{

/***/ 49570:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ManageEventIndexDialog)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35466);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74879);
/* harmony import */ var _SdkConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(78005);
/* harmony import */ var _settings_SettingsStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40168);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(94456);
/* harmony import */ var _utils_FormattingUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(93278);
/* harmony import */ var _indexing_EventIndexPeg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18911);
/* harmony import */ var _settings_SettingLevel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6197);
/* harmony import */ var _components_views_elements_Field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(40686);
/* harmony import */ var _components_views_dialogs_BaseDialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(45960);
/* harmony import */ var _components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(74588);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/*
Copyright 2020-2021 The Matrix.org Foundation C.I.C.

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












/*
 * Allows the user to introspect the event index state and disable it.
 */
class ManageEventIndexDialog extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "updateCurrentRoom", async room => {
      const eventIndex = _indexing_EventIndexPeg__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.get();
      let stats;
      try {
        stats = await eventIndex.getStats();
      } catch {
        // This call may fail if sporadically, not a huge issue as we will
        // try later again and probably succeed.
        return;
      }
      let currentRoom = null;
      if (room) currentRoom = room.name;
      const roomStats = eventIndex.crawlingRooms();
      const crawlingRoomsCount = roomStats.crawlingRooms.size;
      const roomCount = roomStats.totalRooms.size;
      this.setState({
        eventIndexSize: stats.size,
        eventCount: stats.eventCount,
        crawlingRoomsCount: crawlingRoomsCount,
        roomCount: roomCount,
        currentRoom: currentRoom
      });
    });
    _defineProperty(this, "onDisable", async () => {
      const DisableEventIndexDialog = (await __webpack_require__.e(/* import() */ 797).then(__webpack_require__.bind(__webpack_require__, 85797))).default;
      _Modal__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z.createTrackedDialog("Disable message search", "Disable message search", DisableEventIndexDialog, null, null, /* priority = */false, /* static = */true);
    });
    _defineProperty(this, "onCrawlerSleepTimeChange", e => {
      this.setState({
        crawlerSleepTime: e.target.value
      });
      _settings_SettingsStore__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .C.setValue("crawlerSleepTime", null, _settings_SettingLevel__WEBPACK_IMPORTED_MODULE_7__/* .SettingLevel */ .R.DEVICE, e.target.value);
    });
    this.state = {
      eventIndexSize: 0,
      eventCount: 0,
      crawlingRoomsCount: 0,
      roomCount: 0,
      currentRoom: null,
      crawlerSleepTime: _settings_SettingsStore__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .C.getValueAt(_settings_SettingLevel__WEBPACK_IMPORTED_MODULE_7__/* .SettingLevel */ .R.DEVICE, 'crawlerSleepTime')
    };
  }
  componentWillUnmount() {
    const eventIndex = _indexing_EventIndexPeg__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.get();
    if (eventIndex !== null) {
      eventIndex.removeListener("changedCheckpoint", this.updateCurrentRoom);
    }
  }
  async componentDidMount() {
    let eventIndexSize = 0;
    let crawlingRoomsCount = 0;
    let roomCount = 0;
    let eventCount = 0;
    let currentRoom = null;
    const eventIndex = _indexing_EventIndexPeg__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.get();
    if (eventIndex !== null) {
      eventIndex.on("changedCheckpoint", this.updateCurrentRoom);
      try {
        const stats = await eventIndex.getStats();
        eventIndexSize = stats.size;
        eventCount = stats.eventCount;
      } catch {
        // This call may fail if sporadically, not a huge issue as we
        // will try later again in the updateCurrentRoom call and
        // probably succeed.
      }
      const roomStats = eventIndex.crawlingRooms();
      crawlingRoomsCount = roomStats.crawlingRooms.size;
      roomCount = roomStats.totalRooms.size;
      const room = eventIndex.currentRoom();
      if (room) currentRoom = room.name;
    }
    this.setState({
      eventIndexSize,
      eventCount,
      crawlingRoomsCount,
      roomCount,
      currentRoom
    });
  }
  render() {
    const brand = _SdkConfig__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.get().brand;
    let crawlerState;
    if (this.state.currentRoom === null) {
      crawlerState = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Not currently indexing messages for any room.");
    } else {
      crawlerState = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Currently indexing: %(currentRoom)s", {
        currentRoom: this.state.currentRoom
      });
    }
    const doneRooms = Math.max(0, this.state.roomCount - this.state.crawlingRoomsCount);
    const eventIndexingSettings = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("%(brand)s is securely caching encrypted messages locally for them " + "to appear in search results:", {
      brand
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_SettingsTab_subsectionText"
    }, crawlerState, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null), (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Space used:"), " ", (0,_utils_FormattingUtils__WEBPACK_IMPORTED_MODULE_5__/* .formatBytes */ .td)(this.state.eventIndexSize, 0), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null), (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Indexed messages:"), " ", (0,_utils_FormattingUtils__WEBPACK_IMPORTED_MODULE_5__/* .formatCountLong */ .O1)(this.state.eventCount), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null), (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Indexed rooms:"), " ", (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("%(doneRooms)s out of %(totalRooms)s", {
      doneRooms: (0,_utils_FormattingUtils__WEBPACK_IMPORTED_MODULE_5__/* .formatCountLong */ .O1)(doneRooms),
      totalRooms: (0,_utils_FormattingUtils__WEBPACK_IMPORTED_MODULE_5__/* .formatCountLong */ .O1)(this.state.roomCount)
    }), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_elements_Field__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
      label: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)('Message downloading sleep time(ms)'),
      type: "number",
      value: this.state.crawlerSleepTime.toString(),
      onChange: this.onCrawlerSleepTimeChange
    })));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_dialogs_BaseDialog__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
      className: "mx_ManageEventIndexDialog",
      onFinished: this.props.onFinished,
      title: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Message search")
    }, eventIndexingSettings, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
      primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Done"),
      onPrimaryButtonClick: this.props.onFinished,
      primaryButtonClass: "primary",
      cancelButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_1__._t)("Disable"),
      onCancel: this.onDisable,
      cancelButtonClass: "danger"
    }));
  }
}

/***/ })

}]);
//# sourceMappingURL=570.js.map