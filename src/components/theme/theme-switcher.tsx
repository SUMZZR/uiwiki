"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const themeOptions = [
  { value: "light", label: "Use light theme", icon: Sun },
  { value: "dark", label: "Use dark theme", icon: Moon },
  { value: "system", label: "Use system theme", icon: Monitor },
] as const;

const subscribe = () => () => undefined;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-line bg-surface/90 p-1 shadow-[0_4px_18px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-colors duration-200" role="group" aria-label="Color theme">
      {themeOptions.map((option) => {
        const Icon = option.icon;
        const active = mounted && theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            aria-label={option.label}
            aria-pressed={active}
            title={option.label}
            className={`grid size-8 place-items-center rounded-full transition-colors duration-200 ${active ? "bg-lime text-[#111111]" : "text-muted hover:bg-surface-muted hover:text-foreground"}`}
          >
            <Icon className="size-3.5" strokeWidth={1.9} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
