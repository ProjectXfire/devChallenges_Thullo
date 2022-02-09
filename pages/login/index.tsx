import Head from "next/head";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
// Providers
import { MdEmail, MdOutlineLock } from "react-icons/md";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import sanitizeHTML from "sanitize-html";
// Models
import { UserLoginDto, UserLoginSchema } from "@models/user";
// Utils
import { useLogin } from "@utils/hook/useLogin";
import { parseCookies } from "@utils/parseCookies";
// Logo
import Logo from "@public/Logo.svg";
// Components
import {
  Container,
  Section,
  BottomMessage,
} from "@styles/common/UserContainer";
import { Button } from "@styles/common/Button";
import { InputGroup } from "@styles/common/Input";
import { colors } from "@styles/variables";
import { Alert } from "@styles/common/Alert";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const token = parseCookies(ctx);
  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

const Login = () => {
  //******** STATES ********//
  // Main hook
  const { onLogin, error, disabled } = useLogin();
  // Form states
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserLoginDto>({ resolver: joiResolver(UserLoginSchema) });

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="login screen" content="login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Section>
          <Image src={Logo} alt="logo" />
          <h1>Login</h1>
          <form onSubmit={handleSubmit(onLogin)}>
            <InputGroup disabled={disabled}>
              <MdEmail color={colors.blue} size={20} />
              <input
                type="text"
                placeholder="Email"
                disabled={disabled}
                onChange={(e) => {
                  const email = sanitizeHTML(e.target.value, {
                    allowedTags: [],
                    allowedAttributes: {},
                  });
                  setValue("email", email);
                }}
              />
            </InputGroup>
            {errors.email && <Alert>{errors.email.message}</Alert>}
            <InputGroup disabled={disabled}>
              <MdOutlineLock color={colors.blue} size={20} />
              <input
                type="password"
                placeholder="Password"
                disabled={disabled}
                onChange={(e) => {
                  const password = sanitizeHTML(e.target.value, {
                    allowedTags: [],
                    allowedAttributes: {},
                  });
                  setValue("password", password);
                }}
              />
            </InputGroup>
            {errors.password && <Alert>{errors.password.message}</Alert>}
            <Button type="submit" fullWidth>
              Login
            </Button>
            {error && <Alert>{error}</Alert>}
          </form>
          <BottomMessage>
            Do not have an account yet?
            <Link href="/register">
              <a>register here</a>
            </Link>
          </BottomMessage>
        </Section>
      </Container>
    </>
  );
};

export default Login;
