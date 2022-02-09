import Head from "next/head";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
// Providers
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import {
  MdEmail,
  MdOutlineLock,
  MdPerson,
  MdSmartToy,
  MdOutlinePersonOutline,
} from "react-icons/md";
import sanitizeHTML from "sanitize-html";
// Models
import { UserRegisterDto, UserRegisterSchema } from "@models/user";
// Utils
import { useRegister } from "@utils/hook/useRegister";
import { parseCookies } from "@utils/parseCookies";
// Logo
import Logo from "@public/Logo.svg";
// Components
import { colors } from "@styles/variables";
import {
  Container,
  Section,
  BottomMessage,
} from "@styles/common/UserContainer";
import { Button } from "@styles/common/Button";
import { InputGroup } from "@styles/common/Input";
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

const Register = () => {
  //******** STATES ********//
  // Main hook
  const { onRegister, error, disabled } = useRegister();
  // Form states
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserRegisterDto>({ resolver: joiResolver(UserRegisterSchema) });

  //******** RENDERS ********//
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="register screen" content="register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Section>
          <Image src={Logo} alt="logo" />
          <h1>Register</h1>
          <form onSubmit={handleSubmit(onRegister)}>
            <InputGroup disabled={disabled}>
              <MdSmartToy color={colors.blue} size={20} />
              <input
                type="text"
                placeholder="Username"
                disabled={disabled}
                onChange={(e) => {
                  const username = sanitizeHTML(e.target.value, {
                    allowedTags: [],
                    allowedAttributes: {},
                  });
                  setValue("username", username);
                }}
              />
            </InputGroup>
            {errors.username && <Alert>{errors.username.message}</Alert>}
            <InputGroup disabled={disabled}>
              <MdPerson color={colors.blue} size={20} />
              <input
                type="text"
                placeholder="Name"
                disabled={disabled}
                onChange={(e) => {
                  const name = sanitizeHTML(e.target.value, {
                    allowedTags: [],
                    allowedAttributes: {},
                  });
                  setValue("name", name);
                }}
              />
            </InputGroup>
            {errors.name && <Alert>{errors.name.message}</Alert>}
            <InputGroup disabled={disabled}>
              <MdOutlinePersonOutline color={colors.blue} size={20} />
              <input
                type="text"
                placeholder="Last name"
                disabled={disabled}
                onChange={(e) => {
                  const lastname = sanitizeHTML(e.target.value, {
                    allowedTags: [],
                    allowedAttributes: {},
                  });
                  setValue("lastname", lastname);
                }}
              />
            </InputGroup>
            {errors.lastname && <Alert>{errors.lastname.message}</Alert>}
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
              Save
            </Button>
            {error && <Alert>{error}</Alert>}
          </form>
          <BottomMessage>
            Already a member?
            <Link href="/login">
              <a>Login here</a>
            </Link>
          </BottomMessage>
        </Section>
      </Container>
    </>
  );
};

export default Register;
