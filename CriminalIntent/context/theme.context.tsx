import { createContext, useState, ReactNode } from "react";

interface ThemeColors {
  background: string;
  text: string;
  border: string;
  header: string;
}

interface ThemeShadow {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

interface Theme {
  Colors: ThemeColors;
  Shadow: ThemeShadow;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (themeName: string) => void;
  availableThemes: string[];
}

const themes = {
  white: {
    Colors: {
      background: "white",
      text: "black",
      border: "black",
      header: "#f0f0f0",
    },
    Shadow: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }
  },
  blue: {
    Colors: {
      background: "lightblue",
      text: "black",
      border: "black",
      header: "#a0c4e6",
    },
    Shadow: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }
  },
  yellow: {
    Colors: {
      background: "lightyellow",
      text: "black",
      border: "black",
      header: "#f0f0a0",
    },
    Shadow: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }
  },
  black: {
    Colors: {
      background: "black",
      text: "white",
      border: "white",
      header: "#1a1a1a",
    },
    Shadow: {
      shadowColor: "#fff",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }
  },
  purple: {
    Colors: {
      background: "#1f1137",
      text: "white",
      border: "white",
      header: "#150c26",
    },
    Shadow: {
      shadowColor: "#fff",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }
  }
};

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.white,
  setTheme: () => {},
  availableThemes: Object.keys(themes)
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState(themes.white);

  const setTheme = (themeName: string) => {
    const newTheme = themes[themeName as keyof typeof themes];
    if (newTheme) {
      setThemeState(newTheme);
    }
  };

  const themeValue: ThemeContextType = {
    theme,
    setTheme,
    availableThemes: Object.keys(themes)
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;