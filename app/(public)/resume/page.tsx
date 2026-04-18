"use client";

import { useEffect } from "react";

export default function ResumePage() {
  useEffect(() => {
    const link = document.createElement("a");
    link.href = "/resume/Dnyaneshwar-Resume.pdf"; // path from public folder
    link.download = "Dnyaneshwar-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium">
        Your download should start automatically...
      </p>
    </div>
  );
}
