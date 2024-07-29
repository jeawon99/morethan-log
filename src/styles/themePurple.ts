// imports from your theming library

import { Theme, ThemeSupa, ThemeVariables } from '@supabase/auth-ui-shared';

// Function to create and extend a theme
function createExtendedTheme(baseTheme: Theme, modifications: Partial<ThemeVariables>): Theme {
  let newTheme: Theme = JSON.parse(JSON.stringify(baseTheme)); // Deep copy the base theme

  // Override or extend the theme properties
  newTheme.default = {
    ...newTheme.default,
    ...modifications // Spread the modifications to override the default settings
  };

  return newTheme;
}

// Using the function to create a new theme based on ThemeSupa
const MyCustomTheme: Theme = createExtendedTheme(ThemeSupa, {
  colors: {
    // Override specific colors or add new ones
    brand: "hsl(276 60.0% 53.0%)",
    brandAccent: "hsl(275 54.8% 45.1%)",
    brandButtonText: "white",
    defaultButtonBackground: "white",
    defaultButtonBackgroundHover: "#eaeaea",
    defaultButtonBorder: "lightgray",
    defaultButtonText: "gray",
    dividerBackground: "#eaeaea",
    inputBackground: "transparent",
    inputBorder: "lightgray",
    inputBorderHover: "gray",
    inputBorderFocus: "gray",
    inputText: "black",
    inputLabelText: "gray",
    inputPlaceholder: "darkgray",
    messageText: "#2b805a",
    messageBackground: "#e7fcf1",
    messageBorder: "#d0f3e1",
    messageTextDanger: "#ff6369",
    messageBackgroundDanger: "#fff8f8",
    messageBorderDanger: "#822025",
    anchorTextColor: "gray",
    anchorTextHoverColor: "darkgray"
  },
  // Other modifications can be added here as needed
});

// Export the new theme to use it throughout your application
export { MyCustomTheme };
var test = {
    default: {
      colors: {
        brand: "hsl(153 60.0% 53.0%)",
        brandAccent: "hsl(154 54.8% 45.1%)",
        brandButtonText: "white",
        defaultButtonBackground: "white",
        defaultButtonBackgroundHover: "#eaeaea",
        defaultButtonBorder: "lightgray",
        defaultButtonText: "gray",
        dividerBackground: "#eaeaea",
        inputBackground: "transparent",
        inputBorder: "lightgray",
        inputBorderHover: "gray",
        inputBorderFocus: "gray",
        inputText: "black",
        inputLabelText: "gray",
        inputPlaceholder: "darkgray",
        messageText: "#2b805a",
        messageBackground: "#e7fcf1",
        messageBorder: "#d0f3e1",
        messageTextDanger: "#ff6369",
        messageBackgroundDanger: "#fff8f8",
        messageBorderDanger: "#822025",
        anchorTextColor: "gray",
        anchorTextHoverColor: "darkgray"
      },
      space: {
        spaceSmall: "4px",
        spaceMedium: "8px",
        spaceLarge: "16px",
        labelBottomMargin: "8px",
        anchorBottomMargin: "4px",
        emailInputSpacing: "4px",
        socialAuthSpacing: "4px",
        buttonPadding: "10px 15px",
        inputPadding: "10px 15px"
      },
      fontSizes: {
        baseBodySize: "13px",
        baseInputSize: "14px",
        baseLabelSize: "14px",
        baseButtonSize: "14px"
      },
      fonts: {
        bodyFontFamily: `ui-sans-serif, sans-serif`,
        buttonFontFamily: `ui-sans-serif, sans-serif`,
        inputFontFamily: `ui-sans-serif, sans-serif`,
        labelFontFamily: `ui-sans-serif, sans-serif`
      },
      // fontWeights: {},
      // lineHeights: {},
      // letterSpacings: {},
      // sizes: {},
      borderWidths: {
        buttonBorderWidth: "1px",
        inputBorderWidth: "1px"
      },
      // borderStyles: {},
      radii: {
        borderRadiusButton: "4px",
        buttonBorderRadius: "4px",
        inputBorderRadius: "4px"
      }
      // shadows: {},
      // zIndices: {},
      // transitions: {},
    },
    dark: {
      colors: {
        brandButtonText: "white",
        defaultButtonBackground: "#2e2e2e",
        defaultButtonBackgroundHover: "#3e3e3e",
        defaultButtonBorder: "#3e3e3e",
        defaultButtonText: "white",
        dividerBackground: "#2e2e2e",
        inputBackground: "#1e1e1e",
        inputBorder: "#3e3e3e",
        inputBorderHover: "gray",
        inputBorderFocus: "gray",
        inputText: "white",
        inputPlaceholder: "darkgray",
        messageText: "#85e0b7",
        messageBackground: "#072719",
        messageBorder: "#2b805a",
        messageBackgroundDanger: "#1f1315"
      }
    }
  };