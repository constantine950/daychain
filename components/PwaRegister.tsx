"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    // only in production, so dev doesn't serve stale cached files
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);

  return null;
}
