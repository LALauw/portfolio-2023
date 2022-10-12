import { Content } from "./Content";
import { CoverImage } from "./CoverImage";

export interface ProjectItem {
  title: string;
  smallTitle: string;
  subtitle: string;
  summary: string;
  date: string;
  coverImage: CoverImage;
  articleImage: CoverImage;
  demoVideo: CoverImage;
  content: Content;
  markdown: string;
  slug: string;
}
