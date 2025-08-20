import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-black/10 mt-16">
      <div className="container py-8 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} CalmClick. All rights reserved.</p>
        <p className="opacity-70">Made for Dubai • English | العربية</p>
      </div>
    </footer>
  );
}
