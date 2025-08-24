import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`rounded px-4 py-2 bg-red-600 hover:bg-red-700 text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
