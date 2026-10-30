"use client";

import { useEffect, useState } from "react";

export function LiveClock() {
  const [timeStr, setTimeStr] = useState<string>("00:00:00 WIB");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTimeStr(`${formatter.format(now)} WIB`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="font-mono text-xs text-[var(--bp-line)]">{timeStr}</span>;
}
