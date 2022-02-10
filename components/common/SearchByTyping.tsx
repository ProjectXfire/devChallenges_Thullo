import React, { useEffect, useState } from "react";
// Providers
import { MdClear } from "react-icons/md";
import sanitizeHTML from "sanitize-html";
// Componenents & styled components
import { InputGroup } from "@styles/common/Input";

interface Props {
  onSearch: (value: string) => void;
  onClean: () => void;
}

export const SearchByTyping = ({ onSearch, onClean }: Props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    return () => {
      onClean();
    };
  }, []);

  return (
    <InputGroup>
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => {
          const value = sanitizeHTML(e.target.value, {
            allowedTags: [],
            allowedAttributes: {},
          });
          setValue(value);
          onSearch(value);
        }}
      />
      {value && (
        <MdClear
          size={20}
          onClick={() => {
            setValue("");
            onClean();
          }}
        />
      )}
    </InputGroup>
  );
};
