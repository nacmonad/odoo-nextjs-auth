import plugin from "tailwindcss/plugin";
//import plugin from "../../node_modules/tailwindcss-animate/index";

export const theme = plugin(

  function ({ addBase }) {
    //light/dark tailwind defs
    addBase({
      ":root": {
        "--background": "0 0% 100%",
        "--foreground": "222.2 84% 4.9%",
        "--card": "0 0% 100%",
        "--card-foreground": "222.2 84% 4.9%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "222.2 84% 4.9%",
        "--primary": "222.2 47.4% 11.2%",
        "--primary-foreground": "210 40% 98%",
        "--secondary": "210 40% 96.1%",
        "--secondary-foreground": "222.2 47.4% 11.2%",
        "--muted": "210 40% 96.1%",
        "--muted-foreground": "215.4 16.3% 46.9%",
        "--accent": "210 40% 96.1%",
        "--accent-foreground": "222.2 47.4% 11.2%",
        "--destructive": "0 84.2% 60.2%",
        "--destructive-foreground": "210 40% 98%",
        "--border": "214.3 31.8% 91.4%",
        "--input": "214.3 31.8% 91.4%",
        "--ring": "222.2 84% 4.9%",
        "--radius": "0.5rem"
      },
      ".dark": {
        "--background": "222.2 84% 4.9%",
        "--foreground": "210 40% 98%",
        "--card": "222.2 84% 4.9%",
        "--card-foreground": "210 40% 98%",
        "--popover": "222.2 84% 4.9%",
        "--popover-foreground": "210 40% 98%",
        "--primary": "210 40% 98%",
        "--primary-foreground": "222.2 47.4% 11.2%",
        "--secondary": "217.2 32.6% 17.5%",
        "--secondary-foreground": "210 40% 98%",
        "--muted": "217.2 32.6% 17.5%",
        "--muted-foreground": "215 20.2% 65.1%",
        "--accent": "217.2 32.6% 17.5%",
        "--accent-foreground": "210 40% 98%",
        "--destructive": "0 62.8% 30.6%",
        "--destructive-foreground": "210 40% 98%",
        "--border": "217.2 32.6% 17.5%",
        "--input": "217.2 32.6% 17.5%",
        "--ring": "212.7 26.8% 83.9%"
      }
    })
    addBase({
      "*": {
        "@apply border-border": {}
      },
      "body": {
        "@apply bg-background text-foreground": {}
      }
    })

    //navitem underline accents
    addBase({
      ":root":{
        ".animation-hover:after": {
          "background": "none repeat scroll 0 0 transparent",
          "content": '""',
          "height": "2px",
          "transition": "width 0.3s ease 0s, left 0.3s ease 0s",
          "@apply w-0 bg-blue-800 left-1/2 block bottom-0 absolute": true
        },
        ".animation-active:after": { "@apply left-0 w-full": true },
        ".animation-hover:hover:after": { "@apply left-0 w-full": true }
      },
      ".dark": {
        ".animation-hover:after": {
          "background": "none repeat scroll 0 0 transparent",
          "content": '""',
          "height": "2px",
          "transition": "width 0.3s ease 0s, left 0.3s ease 0s",
          "@apply w-0 bg-pink-800 left-1/2 block bottom-0 absolute": true
        },
        ".animation-active:after": { "@apply left-0 w-full": true },
        ".animation-hover:hover:after": { "@apply left-0 w-full": true }
      }
    })
    
  },
  //theme extension
  {
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
          //marquee animation is for the infinite carousel
          //the variations are for different screen breakpoints
          //ensuring fluidity across all screens
          "marquee-lg": {
            "0%": {
              left: "0",
            },
            "100%": {
              left: "-100%",
            },
          },
          "marquee-md": {
            "0%": {
              left: "0%",
            },
            "100%": {
              left: "-150%",
            },
          },
          "marquee-sm": {
            "0%": {
              left: "0%",
            },
            "100%": {
              left: "-200%",
            },
          },
          "marquee-xsm": {
            "0%": {
              left: "0%",
            },
            "100%": {
              left: "-300%",
            },
          },
          ping2: {
            "0%": {
              transform: "translateY(-25%)",
              opacity: "1",
            },
            "50%": {
              transform: "translateY(0)",
            },
            "75%": {
              transform: " scale(0.8)",
              opacity: '0.25',
            },
            "100%": {
              transform: "translateY(-25%) scale(1)",
              //transform: "scale(1)",
              opacity: "0",
            },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          "around-lg": "marquee-lg 15s linear infinite",
          "around-md": "marquee-md 15s linear infinite",
          "around-sm": "marquee-sm 15s linear infinite",
          "around-xsm": "marquee-xsm 15s linear infinite",
          ping2: "ping2 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        },

        width: {
          50: "50%",
          200: "200%",
          250: "250%",
          300: "300%",
          400: "400%",
          450: "450%",
          500: "500%",
          600: "600%",
          '30': "7.5rem",
        },
      },
    },
  }

)

