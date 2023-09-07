import type { SiteConfig } from "@/data/types";

export const siteConfig: SiteConfig = {
  // Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
  author: "Vic Vijayakumar",
  // Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
  title: "Vic Vijayakumar",
  // Meta property used as the default description meta property
  description: "Hi, I am Vic. I blog about software engineering and indie making.",
  // HTML lang property, found in src/layouts/Base.astro L:18
  lang: "en-US",
  // Meta property, found in src/components/BaseHead.astro L:42
  ogLocale: "en_US",
  // Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
  date: {
    locale: "en-US",
    options: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  },
};

// Used to generate links in both the Header & Footer.
export const menuLinks: Array<{ title: string; path: string }> = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Links",
    path: "/links/",
  },
  {
    title: "Uses",
    path: "/uses/",
  },
];
