import React from 'react';
import GlobalStyles from 'styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import Router from 'components/Router';
import { RecoilRoot } from 'recoil';
import { ApolloProvider } from '@apollo/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { apolloClient } from 'states/apollo/apollo';

// - styles
// GlobalStyles ( reset css + global css )
// themeProvider

// - react-query (REST server state 관리)
// client

// - apollo (GQL server state  관리 )
// client

// - recoil (client state 관리)
// root

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ApolloProvider client={apolloClient}>
            <Router />
            <GlobalStyles />
          </ApolloProvider>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
