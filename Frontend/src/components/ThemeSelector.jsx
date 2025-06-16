import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      {/* DROPDOWN TRIGGER */}
      <div className="tooltip tooltip-bottom" data-tip="Change Theme">
        <button 
          tabIndex={0} 
          className="btn btn-ghost btn-sm btn-circle hover:bg-base-200 hover:scale-105 transition-all duration-200 group"
        >
          <PaletteIcon className="size-5 text-base-content/70 group-hover:text-primary group-hover:rotate-12 transition-all duration-200" />
        </button>
      </div>

      <div
        tabIndex={0}
        className="dropdown-content mt-3 p-2 shadow-2xl bg-base-100/95 backdrop-blur-xl rounded-3xl
        w-64 border border-base-content/10 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
      >
        {/* Header */}
        <div className="px-3 py-2 mb-2">
          <h3 className="text-sm font-semibold text-base-content/80 flex items-center gap-2">
            <PaletteIcon className="size-4 text-primary" />
            Choose Theme
          </h3>
        </div>

        <div className="space-y-1">
          {THEMES.map((themeOption) => (
            <button
              key={themeOption.name}
              className={`
              group w-full px-4 py-3 rounded-2xl flex items-center gap-3 transition-all duration-200
              hover:scale-[1.02] hover:shadow-md relative overflow-hidden
              ${
                theme === themeOption.name
                  ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary ring-2 ring-primary/20 shadow-sm" 
                  : "hover:bg-base-200/60 hover:shadow-sm"
              }
            `}
              onClick={() => setTheme(themeOption.name)}
            >
              {/* Background gradient for active state */}
              {theme === themeOption.name && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
              )}
              
              <div className="relative z-10 flex items-center gap-3 w-full">
                <div className={`p-1.5 rounded-xl transition-all duration-200 ${
                  theme === themeOption.name 
                    ? "bg-primary/20 text-primary" 
                    : "bg-base-content/5 text-base-content/70 group-hover:bg-primary/10 group-hover:text-primary"
                }`}>
                  <PaletteIcon className="size-3.5" />
                </div>
                
                <span className={`text-sm font-medium flex-1 text-left transition-colors duration-200 ${
                  theme === themeOption.name ? "text-primary" : "text-base-content group-hover:text-base-content"
                }`}>
                  {themeOption.label}
                </span>
                
                {/* THEME PREVIEW COLORS */}
                <div className="flex gap-1.5 relative z-10">
                  {themeOption.colors.map((color, i) => (
                    <div
                      key={i}
                      className={`size-3 rounded-full ring-1 ring-white/20 shadow-sm transition-transform duration-200 ${
                        theme === themeOption.name ? "scale-110" : "group-hover:scale-105"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Selection indicator */}
              {theme === themeOption.name && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-3 py-2 mt-2 border-t border-base-content/5">
          <p className="text-xs text-base-content/50 text-center">
            {THEMES.length} themes available
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;