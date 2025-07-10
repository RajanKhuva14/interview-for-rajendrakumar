import { Pagination as MuiPagination } from "@mui/material";

export default function Pagination({ count, page, onChange }) {
  return (
    <div className="w-full max-w-[954px] flex justify-end mx-auto px-4 py-3 flex-wrap items-center overflow-auto">
      <div className="h-auto border border-[#E4E4E7] flex items-center justify-center rounded">
        <MuiPagination
          count={count}
          page={page}
          onChange={onChange}
          shape="rounded"
        />
      </div>
    </div>
  );
}
