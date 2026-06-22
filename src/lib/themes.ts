export interface ThemeConfig {
  id: string;
  name: string;
  videoPath: string;
  videoPortraitPath?: string;
  focalPoint?: string;
  editionLabel: string;
  accentName: string;
  palette?: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
}

export const themes: Record<string, ThemeConfig> = {
  zenitsu: {
    id: "zenitsu",
    name: "Zenitsu Agatsuma",
    videoPath: "/zenitsu-bg.mp4",
    editionLabel: "Thunder Breathing · Zenitsu Edition",
    accentName: "Yellow",
  },
  gojo: {
    id: "gojo",
    name: "Satoru Gojo",
    videoPath: "/gojo-bg.mp4",
    editionLabel: "Limitless Void · Gojo Edition",
    accentName: "Blue",
  },
  igris: {
    id: "igris",
    name: "Shadow Commander Igris",
    videoPath: "/igris-bg.mp4",
    editionLabel: "Shadow Commander · Igris Edition",
    accentName: "Purple",
  },
};
