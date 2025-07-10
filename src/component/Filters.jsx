import { useState } from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Button,
  List,
  ListItem,
  TextField,
  Modal,
  IconButton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";

const STATUS_LABELS = {
  all: "All Launches",
  upcoming: "Upcoming Launches",
  success: "Successful Launches",
  failed: "Failed Launches",
};

export default function Filters({ status, onStatusChange, dateRange, onDateChange }) {
  const [modalOpen, setModalOpen] = useState(false); 
  const [start, end] = dateRange;

  const presets = [
    { label: "Past week", days: 7 },
    { label: "Past month", days: 30 },
    { label: "Past 3 months", days: 90 },
    { label: "Past 6 months", days: 180 },
    { label: "Past year", days: 365 },
    { label: "Past 2 years", days: 365 * 2 },
  ];

  const handlePreset = (days) => {
    const newEnd = new Date();
    const newStart = new Date(newEnd.getTime() - days * 24 * 60 * 60 * 1000);
    onDateChange([newStart, newEnd]);
    setModalOpen(false);
  };

  const handleReset = () => {
    onStatusChange("all");
    onDateChange([null, null]);
    setModalOpen(false);
  };

  return (
    <div className="w-full max-w-[954px] mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-2">
      <Button
        startIcon={<CalendarTodayIcon />}
        onClick={() => setModalOpen(true)}
        variant="text"
        size="small"
        className="!font-medium !text-[16px] !normal-case !text-[#4B5563] font-['Helvetica Neue']"
      >
        {start && end
          ? `${format(start, "dd MMM yyyy")} - ${format(end, "dd MMM yyyy")}`
          : "Select Date Range"}
      </Button>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="date-range-modal"
        aria-describedby="date-range-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
            width: { xs: "90vw", sm: 400 },
            maxWidth: 500,
            outline: "none",
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={handleReset}
              className="!uppercase !text-[12px] px-[6px] py-[2px] border border-[#d33] text-[#d33] hover:bg-[#fbe9e7] hover:border-[#d33]"
            >
              Reset
            </Button>
            <IconButton size="small" onClick={() => setModalOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>

          <List dense disablePadding className="mb-2">
            {presets.map((p) => (
              <ListItem
                button
                key={p.label}
                onClick={() => handlePreset(p.days)}
                className="hover:bg-gray-100 text-sm px-2 py-1 rounded-md"
              >
                {p.label}
              </ListItem>
            ))}
          </List>

          <div className="flex gap-2 flex-col sm:flex-row">
            <DatePicker
              label="Start"
              value={start}
              onChange={(newDate) => onDateChange([newDate, end])}
              renderInput={(props) => (
                <TextField {...props} size="small" fullWidth />
              )}
            />
            <DatePicker
              label="End"
              value={end}
              onChange={(newDate) => onDateChange([start, newDate])}
              renderInput={(props) => (
                <TextField {...props} size="small" fullWidth />
              )}
            />
          </div>
        </Box>
      </Modal>

      <div className="flex items-center gap-2">
        <FormControl
          size="small"
          variant="standard"
          className="[&_.MuiInput-underline:before]:border-b-0 [&_.MuiInput-underline:after]:border-b-0 [&_.MuiInput-underline:hover:not(.Mui-disabled):before]:border-b-0"
        >
          <Select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            displayEmpty
            IconComponent={KeyboardArrowDownIcon}
            renderValue={(value) => (
              <div className="flex items-center gap-[2px] whitespace-nowrap">
                <span className="font-['Helvetica Neue'] font-medium text-[16px] leading-[16px] text-[#4B5563]">
                  {STATUS_LABELS[value]}
                </span>
              </div>
            )}
            className="!flex !items-center min-w-[140px] whitespace-nowrap [&_.MuiSelect-select]:!p-0 [&_.MuiSelect-select]:!pr-6"
          >
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <MenuItem key={key} value={key}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
