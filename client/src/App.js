import ThemeProvider from "react-bootstrap/ThemeProvider";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterApp } from "./router";
import { queryClient } from "./utils";

const App = () => {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <QueryClientProvider client={queryClient}>
        <RouterApp />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
