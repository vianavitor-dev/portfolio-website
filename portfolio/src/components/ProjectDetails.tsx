import { useEffect, useState } from "react";
import type { ProjectCard } from "../common/PublicInterfaces";

type ProjectDetailsProps = {
  selectedProjectIndex: number;
  selectedProject: ProjectCard;
  onClose: () => void;
};

const fallbackImages = [
  "https://placehold.co/800x500?text=Project+Screenshot+1",
  "https://placehold.co/800x500?text=Project+Screenshot+2",
];

export default function ProjectDetails({
  selectedProjectIndex,
  selectedProject,
  onClose,
}: ProjectDetailsProps) {
  const images = selectedProject.imagesUrl?.length
    ? [selectedProject.imagesUrl]
    : fallbackImages;
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedProjectIndex]);

  const showPreviousImage = () => {
    setActiveImageIndex((current) => (current - 1 + images.length) % images.length);
  };

  const showNextImage = () => {
    setActiveImageIndex((current) => (current + 1) % images.length);
  };

  const paragraphs = selectedProject.fullDescription
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div id="project-details" aria-label={`${selectedProject.header} project details`}>
      <button
        type="button"
        className="project-details-close"
        onClick={onClose}
        aria-label="Close project details"
        title="Close project details"
      >
        ×
      </button>
      <div className="project-details-header">
        <p className="sub-title project-subtitle">
          | {selectedProject.subtitle ?? selectedProject.shortDescription}
        </p>
        <h1 className="title">{selectedProject.header}</h1>

        <div className="image-carousel" aria-label="Project screenshots carousel">
          {images.length > 1 && (
            <button
              type="button"
              className="carousel-arrow left"
              onClick={showPreviousImage}
              aria-label="Show previous screenshot"
            >
              ‹
            </button>
          )}

          <div className="image-carousel-viewport">
            <div
              className="image-carousel-track"
              style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
            >
              {images.map((imageUrl, index) => (
                <figure className="image-carousel-slide" key={`${selectedProjectIndex}-${imageUrl}-${index}`}>
                  <img
                    src={imageUrl}
                    alt={`${selectedProject.header} screenshot ${index + 1}`}
                    loading={index === activeImageIndex ? "eager" : "lazy"}
                  />
                </figure>
              ))}
            </div>
          </div>

          {images.length > 1 && (
            <button
              type="button"
              className="carousel-arrow right"
              onClick={showNextImage}
              aria-label="Show next screenshot"
            >
              ›
            </button>
          )}

          {images.length > 1 && (
            <div className="carousel-indicators" aria-label="Choose screenshot">
              {images.map((imageUrl, index) => (
                <button
                  key={`${selectedProjectIndex}-indicator-${imageUrl}-${index}`}
                  type="button"
                  aria-label={`Show screenshot ${index + 1}`}
                  aria-current={index === activeImageIndex ? "true" : undefined}
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="project-details-body">
        <div className="project-description">
          {paragraphs.map((paragraph, index) => (
            <p key={`${selectedProjectIndex}-description-${index}`}>{paragraph}</p>
          ))}
        </div>

        <h3 className="label">
          <span className="user-at-machine">guest@portfolio:</span>
          <span className="user-at-machine-symbol">~$</span>
          Technologies Used
        </h3>
        <div className="simple-terminal-table">
          {selectedProject.technologies.map((item) => (
            <span key={`pd${selectedProjectIndex}#${item}`}>{item}</span>
          ))}
        </div>

        <h3 className="label project-links-heading">
          <span className="user-at-machine">guest@portfolio:</span>
          <span className="user-at-machine-symbol">~$</span>
          Project Links
        </h3>
        <div className="available-at">
          <div className="link">
            <a
              href={selectedProject.deployedUrl ?? undefined}
              className={`project-link${selectedProject.deployedUrl ? " active" : " inactive"}`}
              title={selectedProject.deployedUrl ? "Visit the website" : "Website not available"}
              target={selectedProject.deployedUrl ? "_blank" : undefined}
              rel={selectedProject.deployedUrl ? "noopener noreferrer" : undefined}
              aria-disabled={!selectedProject.deployedUrl}
              onClick={(event) => {
                if (!selectedProject.deployedUrl) event.preventDefault();
              }}
            >
              <span className="project-link-label">Visit Website</span>
              <span className="project-link-arrow" aria-hidden="true">→</span>
            </a>
          </div>

          <div className="link">
            <a
              href={selectedProject.githubUrl ?? undefined}
              className={`project-link${selectedProject.githubUrl ? " active" : " inactive"}`}
              title={selectedProject.githubUrl ? "Visit the GitHub repository" : "GitHub repository not available"}
              target={selectedProject.githubUrl ? "_blank" : undefined}
              rel={selectedProject.githubUrl ? "noopener noreferrer" : undefined}
              aria-disabled={!selectedProject.githubUrl}
              onClick={(event) => {
                if (!selectedProject.githubUrl) event.preventDefault();
              }}
            >
              <span className="project-link-label">GitHub Repository</span>
              <span className="project-link-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
