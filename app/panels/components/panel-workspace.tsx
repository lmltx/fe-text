"use client";

import { PanelCanvas } from "./panel-canvas";
import { PanelSidebar } from "./panel-sidebar";
import { usePanelSensors } from "../hooks/use-panel-sensors";
import { usePanelState } from "../hooks/use-panel-state";

export function PanelWorkspace() {
  const sensors = usePanelSensors();
  const {
    orderedPanels,
    openPanelIds,
    panelOpenState,
    setPanelOpen,
    handleDragEnd,
  } = usePanelState();

  return (
    <main className="flex h-screen min-h-screen overflow-hidden border border-[#d6d6d6] bg-[#efefef] text-[#111827]">
      <PanelSidebar
        panels={orderedPanels}
        panelOpenState={panelOpenState}
        onTogglePanel={(id) => setPanelOpen(id, !panelOpenState[id])}
      />

      <section className="h-full min-w-0 flex-1">
        <PanelCanvas
          openPanelIds={openPanelIds}
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onClosePanel={(id) => setPanelOpen(id, false)}
        />
      </section>
    </main>
  );
}
