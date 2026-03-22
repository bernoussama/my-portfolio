import preset from "franken-ui/shadcn-ui/preset";
import variables from "franken-ui/shadcn-ui/variables";
import ui from "franken-ui";
import hooks from "franken-ui/shadcn-ui/hooks";

const shadcn = hooks();

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./md/**/*.md",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      maxWidth: {
        "8xl": "90rem",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: "hsl(var(--primary))",
              textDecorationColor: "hsl(var(--primary) / 0.35)",
              fontWeight: "500",
              "&:hover": {
                color: "hsl(var(--primary))",
                textDecorationColor: "hsl(var(--primary))",
              },
            },
            code: {
              fontWeight: "400",
              fontFamily: theme("fontFamily.geist-mono").join(", "),
              backgroundColor: "hsl(var(--muted))",
              borderRadius: theme("borderRadius.md"),
              padding: "0.125rem 0.375rem",
            },
          },
        },
        invert: {
          css: {
            a: {
              color: "hsl(var(--primary))",
              textDecorationColor: "hsl(var(--primary) / 0.4)",
              fontWeight: "500",
              "&:hover": {
                color: "hsl(var(--primary))",
                textDecorationColor: "hsl(var(--primary))",
              },
            },
            code: {
              fontWeight: "400",
              fontFamily: theme("fontFamily.geist-mono").join(", "),
              backgroundColor: "hsl(var(--muted))",
              borderRadius: theme("borderRadius.md"),
              padding: "0.125rem 0.375rem",
            },
          },
        },
      }),
    },
  },
  presets: [preset],
  plugins: [
    require('@tailwindcss/typography'),
    variables(),
    ui({
      components: {
        nav: {
          hooks: shadcn.nav,
        },
        offcanvas: {
          hooks: shadcn.offcanvas,
          media: false,
        },
        navbar: {
          hooks: shadcn.navbar,
          media: false,
        },
        animation: {},
        button: {
          hooks: shadcn.button,
        },
        icon: {
          hooks: shadcn.icon,
        },
        iconnav: {
          hooks: shadcn.iconnav,
        },
        label: {
          hooks: shadcn.label,
        },
        card: {
          hooks: shadcn.card,
        },
        divider: {
          hooks: shadcn.divider,
        },
        badge: {
          hooks: shadcn.badge,
        },
        tooltip: {
          hooks: shadcn.tooltip,
        }
      },
    },
    ),
  ],
}

