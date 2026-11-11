// Upstream: ~/src/octane/benchmarks/chat-stream/react/vite.config.js, plus the
// Speedometer additions from ../speedometer-vite.mjs.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { reactCompiler } from '../react-compiler.mjs';
import { speedometerBuild } from '../speedometer-vite.mjs';

const speedometer = speedometerBuild('react');

export default defineConfig({
	base: speedometer.base,
	plugins: [react(), reactCompiler(), speedometer.plugin],
	build: {
		target: 'esnext',
		minify: 'esbuild',
		outDir: speedometer.outDir,
		emptyOutDir: true,
	},
});
