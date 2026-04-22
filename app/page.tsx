"use client";

import type { ComponentType, SVGProps } from "react";
import { useState } from "react";
import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ChatBubbleBottomCenterIcon,
  MapIcon,
  MusicalNoteIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type PanelId = "map" | "music" | "chat";
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type PanelConfig = {
  id: PanelId;
  title: string;
  Icon: IconComponent;
};

const PANELS: PanelConfig[] = [
  { id: "map", title: "地图", Icon: MapIcon },
  { id: "music", title: "音乐", Icon: MusicalNoteIcon },
  { id: "chat", title: "聊天", Icon: ChatBubbleBottomCenterIcon },
];

const PANEL_BY_ID: Record<PanelId, PanelConfig> = {
  map: PANELS[0],
  music: PANELS[1],
  chat: PANELS[2],
};

const INITIAL_OPEN_STATE: Record<PanelId, boolean> = {
  map: true,
  music: true,
  chat: true,
};

type SortablePanelProps = {
  id: PanelId;
  title: string;
  onClose: () => void;
  isFirst: boolean;
};

function SortablePanel({ id, title, onClose, isFirst }: SortablePanelProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <section
      ref={setNodeRef}
      style={style}
      className={`relative flex h-full shrink-0 flex-col bg-[#efefef] ${
        isFirst ? "border-l-0" : "border-l border-[#d6d6d6]"
      } w-[calc(100vw-7rem)] min-w-[18rem] sm:w-[24rem] md:w-auto md:min-w-0 md:flex-1 md:basis-0 ${
        isDragging ? "z-20 shadow-[0_10px_24px_rgba(15,23,42,0.15)]" : ""
      }`}
    >
      <header
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className="relative flex h-10 cursor-grab items-center border-b border-[#d6d6d6] bg-[#e7e7e7] touch-none active:cursor-grabbing"
      >
        <h2 className="w-full select-none text-center text-[2.05rem] leading-none text-[#1f2937]">
          {title}
        </h2>
        <button
          type="button"
          aria-label={`关闭${title}面板`}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[#1f2937] transition-colors hover:text-black"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onClose}
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
      </header>
      <div className="flex-1" />
    </section>
  );
}

export default function Home() {
  const [panelOrder, setPanelOrder] = useState<PanelId[]>(
    PANELS.map((panel) => panel.id),
  );
  const [panelOpenState, setPanelOpenState] = useState(INITIAL_OPEN_STATE);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const orderedPanels = panelOrder.map((id) => PANEL_BY_ID[id]);
  const openPanelIds = panelOrder.filter((id) => panelOpenState[id]);

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

  return (
    <main className="flex h-screen min-h-screen overflow-hidden border border-[#d6d6d6] bg-[#efefef] text-[#111827]">
      <aside className="h-full w-28 shrink-0 border-r border-[#d6d6d6] bg-[#efefef]">
        <ul className="flex flex-col items-center gap-10 pt-10">
          {orderedPanels.map(({ id, title, Icon }) => {
            const isOpen = panelOpenState[id];

            return (
              <li key={id} className="w-full px-2">
                <button
                  type="button"
                  aria-label={`${isOpen ? "关闭" : "打开"}${title}面板`}
                  aria-pressed={isOpen}
                  onClick={() => setPanelOpen(id, !isOpen)}
                  className={`mx-auto flex w-full flex-col items-center justify-center gap-1 transition-all duration-200 ${
                    isOpen
                      ? "text-[#111827] hover:text-black"
                      : "text-[#9ca3af]/70 hover:text-[#6b7280]"
                  }`}
                >
                  <Icon className="h-10 w-10" />
                  <span className="text-[2.1rem] leading-none tracking-tight">
                    {title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <section className="h-full min-w-0 flex-1">
        <DndContext
          id="panel-dnd"
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="h-full overflow-x-auto overflow-y-hidden bg-[#efefef]">
            {openPanelIds.length > 0 ? (
              <SortableContext
                items={openPanelIds}
                strategy={horizontalListSortingStrategy}
              >
                <div className="flex h-full min-w-max touch-pan-x md:min-w-full">
                  {openPanelIds.map((panelId, index) => (
                    <SortablePanel
                      key={panelId}
                      id={panelId}
                      title={PANEL_BY_ID[panelId].title}
                      onClose={() => setPanelOpen(panelId, false)}
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
      </section>
    </main>
  );
}
