import React, { useContext, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// Providers
import styled from "styled-components";
import { MdMenu, MdArrowDropDown } from "react-icons/md";
import { Background } from "@styles/common/Background";
// Hooks
import { useHeader } from "./useHeader";
// Logo
import Logo from "@public/Logo.svg";
// Styles
import { colors, device } from "@styles/variables";
import { Button } from "@styles/common/Button";
// Components
import { DefaultImage } from "@components/common/defaultImage";

export const Header = () => {
  //******** HOOKS ********//
  // Main hook
  const {
    dropdownRef,
    handleSidebar,
    handleUserOptions,
    onLogout,
    profile,
    isLogged,
    user,
    showUserOptions,
    showSidebar,
  } = useHeader();

  //******** METHODS ********//
  // Load image by URL
  const myLoaderAvatar = () => {
    return user.avatar;
  };

  return (
    <>
      {isLogged && (
        <>
          <Nav>
            <Link href="/">
              <a>
                <Image src={Logo} alt="logo" priority />
              </a>
            </Link>
            <Menu>
              <User>
                {user.avatar ? (
                  <ImageLink
                    loader={myLoaderAvatar}
                    src="avatar"
                    width={30}
                    height={30}
                    objectFit="cover"
                    alt="avatar"
                  />
                ) : (
                  <DefaultImage name={user.name} lastname={user.lastname} />
                )}
                <p>{user.username}</p>
                <Dropdown ref={dropdownRef}>
                  <MdArrowDropDown
                    size={20}
                    color="black"
                    onClick={handleUserOptions}
                  />
                  <UserOptions userOptionsActive={showUserOptions}>
                    <button type="button" onClick={profile}>
                      Profile
                    </button>
                    <button type="button" onClick={onLogout}>
                      Log out
                    </button>
                  </UserOptions>
                </Dropdown>
              </User>
            </Menu>
            <HamburguerMenu type="button" onClick={handleSidebar}>
              <MdMenu size={30} />
            </HamburguerMenu>
          </Nav>
          {showSidebar && <Background onClick={handleSidebar} />}
          <SidebarMenu sidebarActive={showSidebar}>
            <section>
              <Image width={80} src={Logo} alt="logo" priority />
              <div>
                {user.avatar ? (
                  <ImageLink
                    loader={myLoaderAvatar}
                    src="avatar"
                    width={30}
                    height={30}
                    objectFit="cover"
                    alt="avatar"
                  />
                ) : (
                  <DefaultImage name={user.name} lastname={user.lastname} />
                )}
                {user.username}
              </div>
            </section>
            <SideBarMenuActions>
              <Button width="100px" type="button" onClick={onLogout}>
                Log out
              </Button>
              <Button width="100px" type="button" onClick={profile}>
                Profile
              </Button>
            </SideBarMenuActions>
          </SidebarMenu>
        </>
      )}
    </>
  );
};

//******** STYLES  ********//

interface SProps {
  sidebarActive?: boolean;
  userOptionsActive?: boolean;
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  align-items: center;
  background-color: ${colors.grey};
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
`;

const HamburguerMenu = styled.button`
  display: flex;
  border: none;
  background-color: transparent;
  cursor: pointer;
  @media ${device.tablet} {
    display: none;
  }
`;

const Menu = styled.div`
  display: none;
  @media ${device.tablet} {
    display: flex;
    align-items: center;
    gap: 40px;
    font-weight: bold;
  }
`;

const SidebarMenu = styled.nav<SProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 10px;
  top: 0;
  bottom: 0;
  right: 70px;
  left: 0;
  padding-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: white;
  overflow: auto;
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 3;
  transition: all 1s;
  transform: ${(props) =>
    props.sidebarActive ? "translateX(0)" : "translateX(-100%)"};
  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    color: ${colors.blue};
    border-bottom: 2px solid ${colors.blue};
  }
  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const SideBarMenuActions = styled.div`
  display: flex;
  gap: 10px;
`;

const User = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  svg {
    cursor: pointer;
  }
`;

const ImageLink = styled(Image)`
  border-radius: 5px;
`;

const Dropdown = styled.div`
  display: flex;
  align-items: center;
`;

const UserOptions = styled.div<SProps>`
  position: absolute;
  min-width: 70px;
  display: ${(props) => (props.userOptionsActive ? "flex" : "none")};
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 5px;
  gap: 5px;
  right: 0px;
  top: 45px;
  z-index: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${colors.grey};
  border-radius: 10px;
  button {
    background-color: ${colors.grey};
    border: none;
    outline: none;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
