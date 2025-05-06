module.exports = {
  darkMode: ['class'],
  important: true, // This is needed to some cases that Tailwind need to override Antd
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Reddit Sans'], // Gán Inter làm font chính
        inter: ['Inter', 'sans-serif'], // Alias cho Inter (nếu cần)
        'reddit-sans': ['Reddit Sans'],
      },
      colors: {
        quoc: {
          50: '#e84165',
          100: '#5c0619',
        },
        template: {
          black: {
            500: '#4F5665',
            600: '#0B132A',
          },
          orange: {
            100: '#FFECEC',
            500: '#F53855',
          },
          green: {
            500: '#2FAB73',
          },
          white: {
            300: '#F8F8F8',
            500: '#fff',
          },
          gray: {
            100: '#EEEFF2',
            400: '#AFB5C0',
            500: '#DDDDDD',
          },
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, -100%, 0)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateZ(0)',
          },
        },
      },
      animation: {
        fadeInDown: '300ms ease-in-out 0s normal none 1 running fadeInDown',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      t: '0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      orange: '0px 20px 20px -15px rgba(245,56,56,0.81) ',
      'orange-md': '0px 20px 40px -15px rgba(245,56,56,0.81) ',
      none: 'none',
    },
  },
  plugins: [import('tailwindcss-animate')],
}
