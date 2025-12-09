import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */

	// From
	// https://opennext.js.org/cloudflare/howtos/workerd
	// https://opennext.js.org/cloudflare/troubleshooting#my-app-fails-to-build-when-i-import-a-specific-npm-package
	serverExternalPackages: ["postgres"],
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
