// src/components/LaunchTable.jsx
import React, { useState } from "react";
import Loader from "./Loader";
import LaunchDetailsModal from "./LaunchDetailsModal";

const STATUS_CONFIG = {
  Upcoming: {
    label: "Upcoming",
    bg: "bg-[#FEF3C7]",
    text: "text-[#A16207]",
  },
  Success: {
    label: "Success",
    bg: "bg-[#D1FAE5]",
    text: "text-[#047857]",
  },
  Failed: {
    label: "Failed",
    bg: "bg-[#FEE2E2]",
    text: "text-[#B91C1C]",
  },
};

const columns = [
  { key: "no", label: "No.", width: "w-[32px]" },
  { key: "launch_date", label: "Launched (UTC)", width: "w-[144px]" },
  { key: "location", label: "Location", width: "w-[120px]" },
  { key: "mission", label: "Mission", width: "w-[120px]" },
  { key: "orbit", label: "Orbit", width: "w-[48px]" },
  { key: "status", label: "Launch Status", width: "w-[88px]" },
  { key: "rocket", label: "Rocket", width: "w-[88px]" },
];

export default function LaunchTable({ data, loading }) {
  const [selectedLaunch, setSelectedLaunch] = useState(null);

  const renderCell = (l, key, idx) => {
    const base = "px-2 text-[12px] text-[#1F2937] font-inter";

    switch (key) {
      case "no":
        return <td className={base}>{idx + 1}</td>;

      case "launch_date":
        return (
          <td className={base}>
            {new Date(l.launch_date_utc).toLocaleString()}
          </td>
        );

      case "location":
        return <td className={base}>{l.launch_site.name}</td>;

      case "mission":
        return <td className={base}>{l.mission_name}</td>;

      case "orbit":
        return <td className={base}>{l.orbit || "—"}</td>;

      case "status": {
        const cfg = STATUS_CONFIG[l.launch_status];
        return (
          <td className="px-2">
            <span
              className={`font-helvetica font-medium text-[12px] h-6 inline-flex items-center justify-center px-2 rounded-full ${cfg.bg} ${cfg.text}`}
            >
              {cfg.label}
            </span>
          </td>
        );
      }

      case "rocket":
        return (
          <td className="px-2 text-[14px] text-[#1F2937] font-inter">
            {l.rocket.name}
          </td>
        );

      default:
        return <td className={base}>—</td>;
    }
  };

  return (
    <div className="w-full max-w-[954px] mx-auto px-4 py-3 overflow-auto">
      <table className="w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-[#F4F5F7] h-[40px]">
          <tr>
            {columns.map(({ key, label, width }) => (
              <th
                key={key}
                className={`px-2 text-[12px] font-inter font-medium text-[#4B5563] text-left ${width}`}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length}>
                <Loader />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-10 text-gray-400"
              >
                No results found for the specified filter
              </td>
            </tr>
          ) : (
            data.map((l, i) => (
              <tr
                key={l.id}
                className="h-[53px] hover:bg-[#F9FAFB] cursor-pointer"
                onClick={() => setSelectedLaunch(l)}
              >
                {columns.map((col) => renderCell(l, col.key, i))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedLaunch && (
        <LaunchDetailsModal
          launch={selectedLaunch}
          onClose={() => setSelectedLaunch(null)}
        />
      )}
    </div>
  );
}
