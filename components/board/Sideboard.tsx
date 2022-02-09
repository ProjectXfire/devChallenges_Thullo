import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
// Providers
import styled from "styled-components";
import sanitizeHTML from "sanitize-html";
import {
  MdOutlineClose,
  MdPerson,
  MdOutlineDescription,
  MdSupervisedUserCircle,
  MdMode,
} from "react-icons/md";
// Context
import { BoardContext } from "@utils/context/board/BoardContext";
// Utils
import { formattingDate } from "@utils/dateFormat";
// Images
import DefaultImgUser from "@public/favicon.ico";
// Components & Styled components
import { Button } from "@styles/common/Button";
import { colors, device } from "@styles/variables";
import { Background } from "@styles/common/Background";
import { Team } from "@components/board/team";
import { DeleteModal } from "@components/common/deleteModal";

interface Props {
  onClose: () => void;
  open: boolean;
  setOpenSideBoard: Dispatch<SetStateAction<boolean>>;
  onRemoveMember: (userId: string) => Promise<void>;
  updateDescription: (
    isPublic?: boolean | null,
    title?: string | null,
    description?: string | null
  ) => Promise<void>;
}

interface UserToDelete {
  userId: string;
  name: string;
}

export const SideBoard = ({
  onClose,
  open,
  setOpenSideBoard,
  onRemoveMember,
  updateDescription,
}: Props) => {
  //******** VARIABLES ********//
  const sideboardRef = useRef<HTMLDivElement>(null);
  const userToDeleteRef = useRef<UserToDelete>({ name: "", userId: "" });

  //******** STATES ********//
  // Context
  const {
    states: { selectedBoard },
  } = useContext(BoardContext);
  // Enable, disable textarea
  const [activeTextarea, setActiveTextarea] = useState(true);
  // Textarea value
  const [textareaValue, setTextareaValue] = useState("");
  // Handle delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //******** METHODS ********//
  // Loader url avatar from admin user
  const loaderAvatar = () => {
    return selectedBoard.members[0].avatar;
  };
  // Handle textarea value
  const handleTextareaValue = (text: string) => {
    setTextareaValue(text);
  };

  //******** EFFECTS ********//
  // Close isPubliMenu on onClick event outside menu
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (open && !sideboardRef.current?.contains(e.target)) {
        setOpenSideBoard(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);
  // Load description
  useEffect(() => {
    setTextareaValue(selectedBoard.description);
  }, [selectedBoard.description]);

  return (
    <>
      {open && (
        <Container ref={sideboardRef}>
          <Header>
            <p>{selectedBoard.title}</p>
            <MdOutlineClose size={20} onClick={onClose} />
          </Header>
          <Content>
            <Field>
              <FieldHeader>
                <div>
                  <MdPerson />
                  <p>Made by</p>
                </div>
              </FieldHeader>
              <FieldContent>
                {selectedBoard.members[0].avatar ? (
                  <Image
                    src="avatar"
                    loader={loaderAvatar}
                    width={40}
                    height={40}
                    objectFit="cover"
                    alt="avatar"
                  />
                ) : (
                  <Image
                    src={DefaultImgUser}
                    width={40}
                    height={40}
                    objectFit="cover"
                    alt="avatar"
                  />
                )}
                <div>
                  <p>
                    {selectedBoard.members[0].name +
                      " " +
                      selectedBoard.members[0].lastname}
                  </p>
                  <span>{formattingDate(selectedBoard.createdAt)}</span>
                </div>
              </FieldContent>
            </Field>
            <Field>
              <FieldHeader>
                <div>
                  <MdOutlineDescription />
                  <p>Description</p>
                </div>
                {activeTextarea && (
                  <Button
                    type="button"
                    onClick={() => setActiveTextarea(false)}
                  >
                    <MdMode />
                    Edit
                  </Button>
                )}
              </FieldHeader>
              <FieldContent disabled={activeTextarea}>
                <textarea
                  disabled={activeTextarea}
                  rows={20}
                  value={textareaValue}
                  onChange={(e) => {
                    const value = sanitizeHTML(e.target.value, {
                      allowedTags: ["strong"],
                      allowedAttributes: {},
                    });
                    handleTextareaValue(value);
                  }}
                ></textarea>
              </FieldContent>
              <FieldActions>
                {!activeTextarea && (
                  <>
                    <Button
                      type="button"
                      bkgColor={colors.grey}
                      textColor="black"
                      onClick={() => {
                        setActiveTextarea(true);
                        setTextareaValue(selectedBoard.description);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setActiveTextarea(true);
                        updateDescription(null, null, textareaValue);
                      }}
                      bkgColor={colors.green}
                    >
                      Save
                    </Button>
                  </>
                )}
              </FieldActions>
            </Field>
            <Field>
              <FieldHeader>
                <div>
                  <MdSupervisedUserCircle />
                  <p>Team</p>
                </div>
              </FieldHeader>
              <FieldContent>
                <TeamContainer>
                  {selectedBoard.members.map((item, index) => (
                    <Team
                      user={item}
                      key={item._id}
                      index={index}
                      onRemoveMember={(userId, name) => {
                        userToDeleteRef.current.name = name;
                        userToDeleteRef.current.userId = userId;
                        setShowDeleteModal(true);
                      }}
                    />
                  ))}
                </TeamContainer>
              </FieldContent>
            </Field>
          </Content>
        </Container>
      )}
      {showDeleteModal && (
        <>
          <Background onClick={() => setShowDeleteModal(false)} />
          <DeleteModal
            itemText={userToDeleteRef.current.name}
            onCancel={() => {
              userToDeleteRef.current.name = "";
              userToDeleteRef.current.userId = "";
              setShowDeleteModal(false);
            }}
            onDelete={() => {
              onRemoveMember(userToDeleteRef.current.userId);
              userToDeleteRef.current.name = "";
              userToDeleteRef.current.userId = "";
              setShowDeleteModal(false);
            }}
          />
        </>
      )}
    </>
  );
};

interface SProps {
  disabled?: boolean;
}

const Container = styled.div`
  min-width: 300px;
  max-height: 800px;
  position: absolute;
  right: 0;
  top: 40px;
  padding: 15px 10px;
  background-color: white;
  -webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  overflow: auto;
  z-index: 2;
  @media ${device.tablet} {
    top: 52px;
  }
`;

const Header = styled.div`
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  svg {
    cursor: pointer;
  }
`;

const Content = styled.div`
  margin-top: 10px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FieldHeader = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(0, 0, 0, 0.3);
  font-size: 0.9rem;
  font-weight: bold;
  & div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const FieldContent = styled.div<SProps>`
  width: 100%;
  display: flex;
  gap: 10px;
  p {
    font-weight: bold;
    margin-bottom: 4px;
  }
  span {
    color: rgba(0, 0, 0, 0.3);
    font-size: 0.9rem;
  }
  textarea {
    min-width: 100% !important;
    padding: 5px;
    border: ${(props) =>
      props.disabled ? "none" : "1px solid rgba(0,0,0,0.3)"};
    border-radius: 10px;
    resize: none;
    outline: none;
  }
`;

const TeamContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FieldActions = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;
