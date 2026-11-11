// Upstream: ~/src/octane/benchmarks/chat-stream/octane-tsrx/vite.config.js,
// plus the Speedometer additions from ../speedometer-vite.mjs. Upstream's
// unminified CHAT_STREAM_WORK diagnostic build is not ported.
import { defineConfig } from 'vite';
import { octane } from 'octane/compiler/vite';
import { speedometerBuild } from '../speedometer-vite.mjs';

const speedometer = speedometerBuild('octane-tsrx');

export default defineConfig({
	base: speedometer.base,
	plugins: [octane(), speedometer.plugin],
	optimizeDeps: {
		exclude: ['octane', 'octane/compiler'],
	},
	build: {
		target: 'esnext',
		minify: 'esbuild',
		outDir: speedometer.outDir,
		emptyOutDir: true,
	},
});
