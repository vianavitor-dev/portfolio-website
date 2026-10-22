
export interface ProjectCard {
  header: string;
  imagesUrl: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  deployedUrl: string;
  githubUrl: string;
}

export interface CommandInterface {
    isCommand: boolean; 
    text: string
}