import { } from "./shell-polyfill-hack.js";
import { } from "./load-skin.js";
import DumpDOMTree from "./dump-tree.js";

import React from "react";
import ReactDOM from "react-dom";

import { MatrixClientPeg } from "matrix-react-sdk/src/MatrixClientPeg";
import { setMissingEntryGenerator } from "matrix-react-sdk/src/languageHandler";

import MatrixClientContext from "matrix-react-sdk/src/contexts/MatrixClientContext";
import RoomView from "matrix-react-sdk/src/components/structures/RoomView";
import ResizeNotifier from "matrix-react-sdk/src/utils/ResizeNotifier";
import defaultDispatcher from "matrix-react-sdk/src/dispatcher/dispatcher";
import DMRoomMap from "matrix-react-sdk/src/utils/DMRoomMap";

import FakeMatrixClient from "./FakeMatrixClient.js";
import { synthesize_room } from "./synthetic-room.js";

// This will be the ReactDOM root container node.
let target = document.getElementById("root");

// We don't have translation data so override fallback hook to not show
// additional debug info for missing translations.
setMissingEntryGenerator(s => s.split("|").at(-1));

// Use a mock MatrixClient and set as the global singleton. This holds the event
// data that is rendered and lets us avoid needing a server.
let client = new FakeMatrixClient;
MatrixClientPeg.matrixClient = client;

// Global matrix-sdk initialization that must be manually run since we are not
// using the top-level entry point and instead focus on RoomView.
DMRoomMap.makeShared().start();

const room1_id = "!AAAAAAAAAAAA:example.org";
const room2_id = "!BBBBBBBBBBBB:example.org";

client.rooms = {};
client.rooms[room1_id] = synthesize_room(room1_id);
client.rooms[room2_id] = synthesize_room(room2_id);

// Demo render of a room.
function render_room(room_id) {
    defaultDispatcher.dispatch({
        action: "view_room",
        room_id,
    }, true);

    let resizeNotifier = new ResizeNotifier;
    let forwardRef = React.createRef();
    let props = {
        mxClient: client,
        threepidInvite: null,
        resizeNotifier,
        key: room_id,
        ref: forwardRef,
    };

    let elem = React.createElement(RoomView, props, null);
    elem = React.createElement(MatrixClientContext.Provider, { value: client }, elem);

    ReactDOM.render(elem, target);

    // A lot of objects are leaked via the two arrays of timers stored in the
    // UserActivity singleton. Work around this.
    if (typeof globalThis.mxUserActivity !== "object") {
        throw "Expected mxUserActivity";
    }
    globalThis.mxUserActivity = undefined;
}

let old_console = console.log;
console.log = function() {};

// Clamp timeouts to prevent leaking memory on each iteration.
let orig_setTimeout = globalThis.setTimeout;
globalThis.setTimeout = function(fun, time) {
    return orig_setTimeout(fun, Math.min(10, time));
};

window.renderRoom1 = function renderRoom1() {
    render_room(room1_id);
}

window.renderRoom2 = function renderRoom2() {
    render_room(room2_id);
}
