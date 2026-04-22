"use client";

import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { INITIAL_OPEN_STATE, PANEL_BY_ID, PANELS } from "../panel-config";
import type { PanelId } from "../panel-types";

export function usePanelState() {
  const [panelOrder, setPanelOrder] = useState<PanelId[]>(() =>
    PANELS.map((panel) => panel.id),
  );
  const [panelOpenState, setPanelOpenState] =
    useState<Record<PanelId, boolean>>(INITIAL_OPEN_STATE);

  const orderedPanels = useMemo(
    () => panelOrder.map((id) => PANEL_BY_ID[id]),
    [panelOrder],
  );

  const openPanelIds = useMemo(
    () => panelOrder.filter((id) => panelOpenState[id]),
    [panelOrder, panelOpenState],
  );

  const setPanelOpen = (id: PanelId, open: boolean) => {
    setPanelOpenState((current) => ({ ...current, [id]: open }));
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      return;
    }

    setPanelOrder((current) => {
      const oldIndex = current.indexOf(active.id as PanelId);
      const newIndex = current.indexOf(over.id as PanelId);

      if (oldIndex < 0 || newIndex < 0) {
        return current;
      }

      return arrayMove(current, oldIndex, newIndex);
    });
  };

  return {
    orderedPanels,
    openPanelIds,
    panelOpenState,
    setPanelOpen,
    handleDragEnd,
  };
}
