import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { chatStreamBuild } from "../speedometer-vite.mjs";

// The React app compiled with React Compiler, through Vite's preset, as the
// React fixture of ChatStreamUpstream is. CHAT_STREAM_COMPILER_LOG=1 lists
// which functions it compiled and why it skipped any.
const logger = process.env.CHAT_STREAM_COMPILER_LOG
    ? {
        logEvent(filename, event) {
            const reasons = event.detail?.options?.details?.map((detail) => detail.message) ?? [];
            console.log(`[react-compiler] ${event.kind} ${event.fnName ?? "(anonymous)"} at line ${event.fnLoc?.start.line}`, ...reasons);
        },
    }
    : undefined;

export default defineConfig(chatStreamBuild("react-compiler", [react(), babel({ presets: [reactCompilerPreset({ logger })] })]));
