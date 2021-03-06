import "../styles/globals.css";
import "@styles/common/pagination.css";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
// Providers
import "react-toastify/dist/ReactToastify.css";
// Context Providers
import { TokenProvider } from "@utils/context/token/TokenContext";
import { UserProvider } from "@utils/context/user/UserContext";
import { BoardProvider } from "@utils/context/board/BoardContext";
import { TaskProvider } from "@utils/context/Task/TaskContext";
// Components
import { Layout } from "@components/layout/Layout";

MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);
  appProps.pageProps.baseUrl = process.env.API_URL;
  return { ...appProps };
};

const MyAppProviders: React.FC = ({ children }) => {
  return (
    <TokenProvider>
      <UserProvider>
        <BoardProvider>
          <TaskProvider>{children}</TaskProvider>
        </BoardProvider>
      </UserProvider>
    </TokenProvider>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MyAppProviders>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MyAppProviders>
  );
}

export default MyApp;
