"use client";

import type { PanelConfig, PanelId } from "../panel-types";

type PanelSidebarProps = {
  panels: PanelConfig[];
  panelOpenState: Record<PanelId, boolean>;
  onTogglePanel: (id: PanelId) => void;
};

export function PanelSidebar({
  panels,
  panelOpenState,
  onTogglePanel,
}: PanelSidebarProps) {
  return (
    <aside className="h-full w-28 shrink-0 border-r border-[#d6d6d6] bg-[#efefef]">
      <ul className="flex flex-col items-center gap-10 pt-10">
        {panels.map(({ id, title, Icon }) => {
          const isOpen = panelOpenState[id];

          return (
            <li key={id} className="w-full px-2">
              <button
                type="button"
                aria-label={`${isOpen ? "关闭" : "打开"}${title}面板`}
                aria-pressed={isOpen}
                onClick={() => onTogglePanel(id)}
                className={`mx-auto flex w-full flex-col items-center justify-center gap-1 transition-all duration-200 ${
                  isOpen
                    ? "text-[#111827] hover:text-black"
                    : "text-[#9ca3af]/70 hover:text-[#6b7280]"
                }`}
              >
                <Icon className="h-10 w-10" />
                <span className="text-[2.1rem] leading-none tracking-tight">{title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
