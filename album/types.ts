export type TemplateName =
  | "cover"
  | "single-spotlight"
  | "duo-classic"
  | "trio-story"
  | "quad-grid"
  | "five-collage"
  | "six-scrapbook"
  | "panoramic-spread"
  | "polaroid-scatter"
  | "memory-timeline"
  | "letter-and-moments"
  | "back-cover";

export type TapePosition =
  | "top"
  | "top-left"
  | "top-right"
  | "both-corners"
  | "none";

export type AspectRatioType = "portrait" | "landscape" | "square" | "auto";

export type TextStyle = "title" | "body" | "hand" | "date" | "letter" | "quote";

export type StickerType =
  | "heart"
  | "sparkle"
  | "star"
  | "cake"
  | "flower"
  | "stamp"
  | "tape"
  | "pin";

/**
 * Slot coordinates are defined on a 200 x 100 spread:
 * - Left page: X from 0 to 100
 * - Right page: X from 100 to 200
 * - Height: Y from 0 to 100
 */
export interface Slot {
  id: string;
  x: number; // 0 to 200 percentage
  y: number; // 0 to 100 percentage
  width: number; // spread percentage width (e.g. 35)
  height: number; // spread percentage height (e.g. 60)
  rotation?: number; // degrees (-15 to 15)
  tape?: TapePosition;
  aspectRatio?: AspectRatioType;
  captionPlaceholder?: string;
  zIndex?: number;
}

export interface TextItem {
  id: string;
  x: number; // 0 to 200
  y: number; // 0 to 100
  text: string;
  style?: TextStyle;
  fontSize?: string; // CSS font-size or Tailwind size class
  rotation?: number;
  maxWidth?: number; // width in spread percent
  color?: string;
}

export interface StickerItem {
  id: string;
  x: number; // 0 to 200
  y: number; // 0 to 100
  type: StickerType;
  rotation?: number;
  size?: number; // scale or size in px
  label?: string;
  color?: string;
}

export interface PhotoItem {
  slotId: string;
  src: string;
  alt: string;
  caption?: string;
  date?: string;
  location?: string;
  width?: number; // override slot width (percent on 200 scale)
  height?: number; // override slot height (percent on 100 scale)
  x?: number; // override slot x position
  y?: number; // override slot y position
  rotation?: number; // override slot rotation angle
  mediaType?: "image" | "video";
}

export interface SpreadData {
  id: string;
  spreadIndex: number;
  template: TemplateName;
  photos: PhotoItem[];
  texts: TextItem[];
  stickers?: StickerItem[];
  backgroundNote?: string;
}

export interface TemplateLayout {
  name: TemplateName;
  title: string;
  description: string;
  slots: Slot[];
  defaultTexts?: TextItem[];
  defaultStickers?: StickerItem[];
}

export interface SiteConfig {
  recipientName: string;
  senderName: string;
  albumTitle: string;
  subtitle: string;
  date: string;
  coverMessage: string;
  music: {
    src: string;
    title: string;
    artist?: string;
  };
  endMessage: {
    title: string;
    letter: string;
    signature: string;
  };
}
