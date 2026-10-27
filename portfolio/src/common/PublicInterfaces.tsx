
export interface ProjectCard {
  header: string;
  subtitle: string;
  imagesUrl: string[];
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  deployedUrl: string | null;
  githubUrl: string | null;
}

export interface CommandInterface {
    isCommand: boolean; 
    text: string
}