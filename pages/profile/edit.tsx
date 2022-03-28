import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
// Providers
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, Controller } from "react-hook-form";
import {
  MdPerson,
  MdSmartToy,
  MdOutlinePersonOutline,
  MdImage,
} from "react-icons/md";
import sanitizeHTML from "sanitize-html";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
// Models
import { TUser, UserUpdateDto, UserUpdateSchema } from "@models/user";
// Services
import { getUserReq } from "@services/app/user";
// Context
import { useProfile } from "@utils/hook/useProfile";
// Utils
import { parseCookies } from "@utils/parseCookies";
// Logo
import DefaultImg from "@public/favicon.ico";
// Components & styled components
import { colors } from "@styles/variables";
import { Container, Section } from "@styles/common/UserContainer";
import { InputGroup, InputFile } from "@styles/common/Input";
import { Alert } from "@styles/common/Alert";
import { Button } from "@styles/common/Button";
import { Background } from "@styles/common/Background";
import { SessionExpired } from "@components/common/sessionExpired";

//******** SSR ********//
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const token = parseCookies(ctx);
    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const user = await getUserReq(token);
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
  token: string;
}

//******** COMPONENT ********//
const EditProfile = ({ user }: Props) => {
  //******** CONTEXT  ********//
  // Main hook
  const {
    error,
    disabled,
    onUpdate,
    tempAvatar,
    changeAvatar,
    sessionExpired,
    setSessionExpired,
  } = useProfile(user);

  //******** STATES ********//
  // Form states
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<UserUpdateDto>({
    resolver: joiResolver(UserUpdateSchema),
    defaultValues: { username: "", name: "", lastname: "" },
  });

  //******** METHODS ********//
  // Load image by URL
  const myLoaderAvatar = () => {
    return user.avatar;
  };

  //******** EFFECTS ********//
  // Set values from user request
  useEffect(() => {
    setValue("username", user.username);
    setValue("name", user.name);
    setValue("lastname", user.lastname);
  }, []);

  return (
    <>
      <Head>
        <title>Edit Profile</title>
        <meta name="edit profile screen" content="edit profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Section>
          <Header>
            <p>Profile</p>
            <Link href="/profile">
              <a>back</a>
            </Link>
          </Header>
          <form onSubmit={handleSubmit(onUpdate)}>
            <InputGroup disabled={disabled}>
              <MdSmartToy color={colors.blue} size={20} />
              <Controller
                name="username"
                control={control}
                render={({ field: { value } }) => (
                  <input
                    type="text"
                    placeholder="Username"
                    disabled={disabled}
                    value={value}
                    onChange={(e) => {
                      const username = sanitizeHTML(e.target.value, {
                        allowedTags: [],
                        allowedAttributes: {},
                      });
                      setValue("username", username);
                    }}
                  />
                )}
              />
            </InputGroup>
            {errors.username && <Alert>{errors.username.message}</Alert>}
            <InputGroup disabled={disabled}>
              <MdPerson color={colors.blue} size={20} />
              <Controller
                name="name"
                control={control}
                render={({ field: { value } }) => (
                  <input
                    type="text"
                    placeholder="Name"
                    disabled={disabled}
                    value={value}
                    onChange={(e) => {
                      const name = sanitizeHTML(e.target.value, {
                        allowedTags: [],
                        allowedAttributes: {},
                      });
                      setValue("name", name);
                    }}
                  />
                )}
              />
            </InputGroup>
            {errors.name && <Alert>{errors.name.message}</Alert>}
            <InputGroup disabled={disabled}>
              <MdOutlinePersonOutline color={colors.blue} size={20} />
              <Controller
                name="lastname"
                control={control}
                render={({ field: { value } }) => (
                  <input
                    type="text"
                    placeholder="Last name"
                    disabled={disabled}
                    value={value}
                    onChange={(e) => {
                      const lastname = sanitizeHTML(e.target.value, {
                        allowedTags: [],
                        allowedAttributes: {},
                      });
                      setValue("lastname", lastname);
                    }}
                  />
                )}
              />
            </InputGroup>
            {errors.lastname && <Alert>{errors.lastname.message}</Alert>}
            <AvatarContainer>
              {user.avatar || tempAvatar ? (
                <>
                  {tempAvatar ? (
                    <SImage
                      width={200}
                      height={200}
                      objectFit="cover"
                      src={tempAvatar}
                      alt="avatar"
                    />
                  ) : (
                    <SImage
                      width={200}
                      height={200}
                      objectFit="cover"
                      loader={myLoaderAvatar}
                      src="avatar"
                      alt="avatar"
                    />
                  )}
                </>
              ) : (
                <SImage
                  width={200}
                  height={200}
                  objectFit="cover"
                  src={DefaultImg}
                  alt="avatar"
                />
              )}
              <InputFile>
                <MdImage size={30} color={colors.darkblue} /> Change
                <input
                  type="file"
                  accept="images/*"
                  onChange={(e) => {
                    changeAvatar(e);
                  }}
                />
              </InputFile>
            </AvatarContainer>
            <Button type="submit" fullWidth>
              Save
            </Button>
            {error && <Alert>{error}</Alert>}
          </form>
        </Section>
        <ToastContainer autoClose={2000} theme="dark" />
        {sessionExpired && (
          <>
            <SessionExpired
              onClick={() => {
                setSessionExpired(false);
                window.location.reload();
              }}
            />
            <Background hideCursorPointer zIndex={9} />
          </>
        )}
      </Container>
    </>
  );
};

export default EditProfile;

//******** STYLES ********//
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

const AvatarContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  color: ${colors.darkblue};
`;

const SImage = styled(Image)`
  border-radius: 10px;
`;
