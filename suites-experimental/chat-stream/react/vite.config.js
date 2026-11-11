import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { chatStreamBuild } from "../speedometer-vite.mjs";

export default defineConfig(chatStreamBuild("react", [react()]));
