"use client";

import {
  DndContext,
  type DndContextProps,
  type DragEndEvent,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PANEL_BY_ID } from "../panel-config";
import type { PanelId } from "../panel-types";
import { SortablePanel } from "./sortable-panel";

type PanelCanvasProps = {
  openPanelIds: PanelId[];
  sensors: DndContextProps["sensors"];
  onDragEnd: (event: DragEndEvent) => void;
  onClosePanel: (id: PanelId) => void;
};

export function PanelCanvas({
  openPanelIds,
  sensors,
  onDragEnd,
  onClosePanel,
}: PanelCanvasProps) {
  return (
    <DndContext
      id="panel-dnd"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <div className="h-full overflow-x-auto overflow-y-hidden bg-[#efefef]">
        {openPanelIds.length > 0 ? (
          <SortableContext items={openPanelIds} strategy={horizontalListSortingStrategy}>
            <div className="flex h-full min-w-max touch-pan-x md:min-w-full">
              {openPanelIds.map((panelId, index) => (
                <SortablePanel
                  key={panelId}
                  id={panelId}
                  title={PANEL_BY_ID[panelId].title}
                  onClose={() => onClosePanel(panelId)}
                  isFirst={index === 0}
                />
              ))}
            </div>
          </SortableContext>
        ) : (
          <div className="flex h-full min-w-full items-center justify-center text-[1.25rem] text-[#6b7280]">
            点击左侧图标打开面板
          </div>
        )}
      </div>
    </DndContext>
  );
}
