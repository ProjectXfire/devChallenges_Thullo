import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
// Providers
import styled from "styled-components";
// Models
import { TUser } from "@models/user";
// Services
import { getUserReq } from "@services/app/user";
// Context
import { useProfile } from "@utils/pages/useProfile";
// Utils
import { parseCookies } from "@utils/parseCookies";
// Logo
import DefaultImg from "@public/favicon.ico";
// Components
import { Container, Section } from "@styles/common/UserContainer";
import { colors } from "@styles/variables";

//******** SSR ********//
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const baseUrl = process.env.API_URL || "";
    const token = parseCookies(ctx);
    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const user = await getUserReq(baseUrl, token);
    return {
      props: {
        user,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
};

interface Props {
  user: TUser;
}

//******** COMPONENT ********//
const Profile = ({ user }: Props) => {
  //******** CONTEXT  ********//
  // User
  const context = useProfile(user, "", "");

  //******** METHODS ********//
  // Load image by URL
  const myLoaderAvatar = () => {
    return user.avatar;
  };

  //******** RENDERS ********//
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="profile screen" content="profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Section>
          <Header>
            <p>Profile</p>
            <Link href="/profile/edit">
              <a>Edit</a>
            </Link>
          </Header>
          <Field>
            <span>Username</span>
            <p>{user.username}</p>
          </Field>
          <Field>
            <span>Name</span>
            <p>{user.name}</p>
          </Field>
          <Field>
            <span>Lastname</span>
            <p>{user.lastname}</p>
          </Field>
          <Field>
            <span>Avatar</span>
            {user.avatar ? (
              <Image
                width={200}
                height={200}
                src="avatar"
                objectFit="cover"
                loader={myLoaderAvatar}
              />
            ) : (
              <Image width={100} height={100} src={DefaultImg} />
            )}
          </Field>
        </Section>
      </Container>
    </>
  );
};

export default Profile;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  p {
    font-size: 2rem;
    font-weight: bold;
  }
  a {
    color: ${colors.blue};
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Field = styled.div`
  width: 100%;
  padding-bottom: 5px;
  margin-bottom: 15px;
  border-bottom: 1px solid black;
  span {
    display: block;
    color: ${colors.blue};
    font-size: 0.8rem;

    margin-bottom: 5px;
  }
`;
