import "../styles/globals.css";
import type { AppProps } from "next/app";
// Providers
import "react-toastify/dist/ReactToastify.css";
// Context Providers
import { TokenProvider } from "@utils/context/token/TokenContext";
import { UserProvider } from "@utils/context/user/UserContext";
import { BoardProvider } from "@utils/context/board/BoardContext";
// Components
import { Layout } from "@components/layout/Layout";

const MyAppProviders: React.FC = ({ children }) => {
  return (
    <TokenProvider>
      <UserProvider>
        <BoardProvider>{children}</BoardProvider>
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
