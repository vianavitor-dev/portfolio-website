
export interface ProjectCard {
  header: string;
  subtitle: string;
  subtitlePt?: string;
  imagesUrl: string[];
  shortDescription: string;
  shortDescriptionPt?: string;
  fullDescription: string;
  fullDescriptionPt?: string;
  technologies: string[];
  deployedUrl: string | null;
  githubUrl: string | null;
}

export interface CommandInterface {
    isCommand: boolean; 
    text: string
}