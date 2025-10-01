import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

type SortBy = "soonestToLatest" | "latestToSoonest" | "recentToOld" | "oldToRecent";

type FilterMenuProps = {
  selected: string;
  options: { label: string; value: SortBy }[];
  onChange: (value: SortBy) => void;
};

export function FilterMenu({ selected, options, onChange }: FilterMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (value: SortBy) => {
    onChange(value);
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-label="filter bookings"
        aria-controls={open ? "filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          color: "white",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
        }}
      >
        <FilterAltIcon />
      </IconButton>

      <Menu id="filter-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem
            key={option.value}
            selected={selected === option.value}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
