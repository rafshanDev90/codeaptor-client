"use client";

import { useState } from "react";
import Image from "next/image";

const BG_COLORS = [
  "from-indigo-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-pink-500 to-rose-600",
  "from-violet-500 to-indigo-600",
];

interface ToolIconProps {
  iconUrl?: string;
  displayName: string;
  size?: number;
  className?: string;
}

export default function ToolIcon({ iconUrl, displayName, size = 40, className = "" }: ToolIconProps) {
  const [errored, setErrored] = useState(false);
  const initial = displayName?.charAt(0)?.toUpperCase() || "?";
  const colorIndex = initial.charCodeAt(0) % BG_COLORS.length;

  if (iconUrl && !errored) {
    return (
      <Image
        src={iconUrl}
        alt={displayName}
        width={size}
        height={size}
        onError={() => setErrored(true)}
        className={`shrink-0 rounded-lg object-contain ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`shrink-0 rounded-lg bg-gradient-to-br ${BG_COLORS[colorIndex]} flex items-center justify-center font-nacelle font-bold text-white ${className}`}
      style={{ width: size, height: size, fontSize: Math.max(size * 0.4, 14) }}
    >
      {initial}
    </div>
  );
}
