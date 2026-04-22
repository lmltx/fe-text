import {
  ChatBubbleBottomCenterIcon,
  MapIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import type { PanelConfig, PanelId } from "./panel-types";

export const PANELS: PanelConfig[] = [
  { id: "map", title: "地图", Icon: MapIcon },
  { id: "music", title: "音乐", Icon: MusicalNoteIcon },
  { id: "chat", title: "聊天", Icon: ChatBubbleBottomCenterIcon },
];

export const PANEL_BY_ID: Record<PanelId, PanelConfig> = {
  map: PANELS[0],
  music: PANELS[1],
  chat: PANELS[2],
};

export const INITIAL_OPEN_STATE: Record<PanelId, boolean> = {
  map: true,
  music: true,
  chat: true,
};
