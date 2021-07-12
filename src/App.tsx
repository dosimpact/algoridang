import React from "react";
import GlobalStyles from "styles/globalStyles";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import Router from "components/Router";
import { RecoilRoot } from "recoil";
import { ApolloProvider } from "@apollo/client";
import { client } from "apollo/apollo";

// - styles
// GlobalStyles ( reset css + global css )
// themeProvider

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <ApolloProvider client={client}>
          <Router />
          <GlobalStyles />
        </ApolloProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
