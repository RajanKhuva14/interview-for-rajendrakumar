// src/components/LaunchDetailsModal.jsx
import React from "react";

export default function LaunchDetailsModal({ launch, onClose }) {
  if (!launch) return null;

  // derive styling from our merged launch_status
  const STATUS_CONFIG = {
    Upcoming: { text: "Upcoming", bg: "bg-yellow-100", textColor: "text-yellow-700" },
    Success:  { text: "Success",  bg: "bg-green-100",  textColor: "text-green-700" },
    Failed:   { text: "Failed",   bg: "bg-red-100",    textColor: "text-red-700" },
  };
  const statusCfg = STATUS_CONFIG[launch.launch_status] || STATUS_CONFIG.Failed;

  // Build the rows
  const rows = [
    { label: "Flight Number", value: launch.flight_number },
    { label: "Mission Name",  value: launch.mission_name },
    { label: "Rocket Version",value: launch.rocket.version },
    { label: "Rocket Name",   value: launch.rocket.name },
    { label: "Manufacturer",  value: launch.rocket.manufacturer },
    { label: "Nationality",   value: launch.rocket.nationality },
    {
      label: "Launch Date",
      value: launch.launch_date_utc
        ? new Date(launch.launch_date_utc).toLocaleString()
        : "—"
    },
    {
      label: "Payload Type",
      value: launch.payloads?.[0]?.type || "—"
    },
    { label: "Orbit",         value: launch.orbit || "—" },
    {
      label: "Launch Site",
      value: launch.launch_site.full_name
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div
        className="
          bg-white rounded-xl shadow-xl 
          flex flex-col overflow-hidden p-6 relative
          w-[72vw] h-auto min-h-[70px]
          md:w-[544px] md:h-[640px]
          sm:p-4
        "
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        {/* Header */}
        <div className="flex items-center gap-6 mb-4">
          <img
            src={launch.patch?.small || "/logo192.png"}
            alt={launch.mission_name}
            className="w-20 h-20 rounded bg-gray-100 object-contain"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold truncate">{launch.mission_name}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${statusCfg.bg} ${statusCfg.textColor}`}
              >
                {statusCfg.text}
              </span>
            </div>
            <div className="text-base text-gray-500 mt-1">{launch.rocket.name}</div>
            <div className="flex items-center gap-2 mt-2" style={{ height: '16px' }}>
              <img src="/assets/nasa.png" alt="NASA" title="NASA" style={{ width: '16.85px', height: '14px', objectFit: 'contain' }} />
              <img src="/assets/wikipedia.png" alt="Wikipedia" title="Wikipedia" style={{ width: '16.85px', height: '14px', objectFit: 'contain' }} />
              <img src="/assets/youtube.png" alt="YouTube" title="YouTube" style={{ width: '16.85px', height: '14px', objectFit: 'contain' }} />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4 text-sm text-gray-700 overflow-y-auto max-h-[120px]">
          {launch.details || "No details available."}
          {launch.links?.wikipedia && (
            <a
              href={launch.links.wikipedia}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline ml-1"
            >
              Wikipedia
            </a>
          )}
        </div>

        {/* Details table */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm text-gray-700">
            <tbody>
              {rows.map(({ label, value }) => (
                <tr key={label}>
                  <td className="font-medium py-1 pr-2">{label}</td>
                  <td>{value ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
