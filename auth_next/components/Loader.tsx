import React from "react";

type LoaderProps = {
  message?: string;
};

export default function Loader({ message = "Please wait…" }: LoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/20 backdrop-blur-md animate-fadeIn"
    >
      {/* Spinner container */}
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-xl shadow-[0_0_25px_rgba(255,255,255,0.15)] border border-white/20">
        {/* Gradient spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gradient-to-r from-purple-500 via-pink-500 to-orange-400 animate-spin" />
          <div className="absolute inset-[6px] bg-white/10 backdrop-blur-sm rounded-full"></div>
        </div>

        {/* Text message */}
        <p className="text-sm font-medium text-white drop-shadow-md">
          {message}
        </p>
      </div>
    </div>
  );
}
