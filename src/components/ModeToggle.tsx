import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <>
      <Button variant="ghost" size="icon" className="block dark:hidden" onClick={() => setTheme("dark")}>
        <Sun className="inline-flex justify-center" />
      </Button>
      <Button variant="ghost" size="icon" className="hidden dark:block" onClick={() => setTheme("light")}>
        <Moon className="inline-flex justify-center" />
      </Button>
    </>
  )
}
