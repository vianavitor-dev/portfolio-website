
export interface ProjectCard {
  header: string;
  imagesUrl: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
}

export interface CommandInterface {
    isCommand: boolean; 
    text: string
}