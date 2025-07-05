import React, { useEffect, useState } from "react";
import Filters from "./component/Filters";
import LaunchTable from "./component/LaunchTable";
import Pagination from "./component/Pagination";
import { getMergedLaunches as getLaunches } from "./api/services/launches";

export default function App() {
  const [launches, setLaunches] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState([null, null]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 12;

  useEffect(() => {
    (async function getLaunchesData() {
      setLoading(true);
      let { data, error } = await getLaunches();
      console.log("TCL: getLaunchesData -> data", data);
      if (error) console.error(error);
      else setLaunches(data);
      setLoading(false);
    })();
  }, []);
  useEffect(() => {
    let data = [...launches];

    if (status !== "all") {
      data = data.filter((l) => {
        if (status === "upcoming") return l.launch_status === "Upcoming";
        if (status === "success") return l.launch_status === "Success";
        if (status === "failed") return l.launch_status === "Failed";
        return true;
      });
    }

    const [start, end] = dateRange;
    if (start && end) {
      data = data.filter((l) => {
        const d = new Date(l.launch_date_utc);
        return d >= start && d <= end;
      });
    }

    setFiltered(data);
    setPage(1);
  }, [launches, status, dateRange]);

  const display = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <header className="w-full h-[72px] bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.10)] flex items-center justify-center">
        <img
          src="/assets/logo.png"
          alt="SpaceX"
          className="w-[260px] h-[32px]"
        />
      </header>
      <div className="max-w-[1440px] mx-auto p-4">
        <Filters
          status={status}
          onStatusChange={setStatus}
          dateRange={dateRange}
          onDateChange={setDateRange}
        />
        <LaunchTable data={display} loading={loading} />
        <Pagination
          count={Math.ceil(filtered.length / pageSize)}
          page={page}
          onChange={(e, v) => setPage(v)}
        />
      </div>
    </>
  );
}
