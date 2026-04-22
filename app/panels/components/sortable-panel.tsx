"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { PanelId } from "../panel-types";

type SortablePanelProps = {
  id: PanelId;
  title: string;
  onClose: () => void;
  isFirst: boolean;
};

export function SortablePanel({ id, title, onClose, isFirst }: SortablePanelProps) {
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
