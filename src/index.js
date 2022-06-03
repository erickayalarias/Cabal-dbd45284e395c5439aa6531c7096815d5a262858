import App from "./App";
import store from "../src/features/store";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { createRoot } from "react-dom/client";
import "./provider/Translation";
import { SnackbarProvider } from "notistack";
import { ToastContainer } from "react-toastify";
import "react-chat-elements/dist/main.css";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./Components/chat/chat.css";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const container = document.getElementById("root");
const root = createRoot(container);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

root.render(
  <>
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </ThirdwebProvider>
    <ToastContainer autoClose={1000}
    
      limit={1}
    />
  </>
);
