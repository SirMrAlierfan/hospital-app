import { RouterProvider } from "react-router-dom"
import { router } from "./routes/route"
import { useThemeStore } from "./store/themeStore"
import { useEffect } from "react";

function App() {
  const theme: "light" | "dark" = useThemeStore((state) => state.theme)
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);
  return (
    <RouterProvider router={router} />
  )
}

export default App
