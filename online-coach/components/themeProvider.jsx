"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({

  children,
  ...props
}) {
    const [mounted, setMounted] = React.useState(false);

  // Set state to indicate the component has mounted on the client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // If the component hasn't mounted yet, render nothing to avoid hydration issues
  if (!mounted) {
    return null; // or you could render a loading spinner here if desired
  }
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
