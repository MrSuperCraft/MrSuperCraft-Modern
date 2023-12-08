import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],

  components: [
    "./src/components/**/*.astro",
    // ... other component paths
  ],
  env: {
    SPOTIFY_CLIENT_ID: '7a2b4b5ae2cb4a1484d54801e1c3871e',
    SPOTIFY_CLIENT_SECRET: '4439117faebd4d2f9de5282e2c3fc668',
  },
});

