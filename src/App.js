import React from "react";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "./redux/store";
import Pagerouting from "./Pagerouting";

const themeConfig = {
  token: {
    colorPrimary: "#1677ff",
    colorInfo: "#1677ff",
    colorSuccess: "#52c41a",
    colorWarning: "#fa8c16",
    colorError: "#ff4d4f",
    borderRadius: 8,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
  },
  components: {
    Button: {
      borderRadius: 6,
      controlHeight: 38
    },
    Card: {
      headerFontSize: 15,
      headerHeight: 48
    },
    Table: {
      headerBg: "#f8faff",
      headerColor: "#1d39c4"
    }
  }
};

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider theme={themeConfig}>
        <Pagerouting />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
