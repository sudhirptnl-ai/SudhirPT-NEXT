import { useEffect, useState } from "react";

export default function ClientOnly({ children, className = "", style }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className={className} style={style} suppressHydrationWarning />;
  return <div className={className} style={style}>{children}</div>;
}
