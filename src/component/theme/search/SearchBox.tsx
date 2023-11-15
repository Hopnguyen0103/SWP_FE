import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import { suggest } from "../../../config/setup"; // Only import the necessary function
import { useRouter } from "next/router";
import { Autocomplete, TextField } from "@mui/material";

export default function SearchBox() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any>([]);

  const handleSearchChange = (event: any, value: string) => {
    setSearchValue(value); // Cập nhật giá trị searchValue khi có sự thay đổi
    const newSuggestions = suggest.filter((item) => {
      if (typeof item === "string" && typeof value === "string") {
        return item.toLowerCase().includes(value.toLowerCase());
      }
      return false;
    });
    setSuggestions(newSuggestions);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const cleanedValue = searchValue.replace(/[%&#/]/g, "");
    router.push(`/search/${cleanedValue}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        position: "relative",
      }}
    >
      <label
        htmlFor="search"
        style={{
          position: "absolute",
          zIndex: 2,
          top: "55%",
          right: "1rem",
          transform: "translateY(-50%)",
        }}
      >
        <SearchIcon color="primary" />
      </label>
      <Autocomplete
        freeSolo
        inputValue={searchValue}
        options={suggestions}
        onInputChange={handleSearchChange}
        selectOnFocus
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            size="small"
            id="search"
            value={searchValue}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "white",
                borderRadius: "1rem",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "1rem",
                border: "1px solid #3e5962",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "2px solid #3e5962 !important",
              },
              width: "100%",
            }}
          />
        )}
      />
    </form>
  );
}
