import type { ComponentType, SVGProps } from "react";

export type PanelId = "map" | "music" | "chat";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type PanelConfig = {
  id: PanelId;
  title: string;
  Icon: IconComponent;
};
