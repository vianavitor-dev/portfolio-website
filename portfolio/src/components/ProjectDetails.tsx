import { useEffect, useRef, useState } from "react";
import type { Dispatch, KeyboardEvent as ReactKeyboardEvent, SetStateAction } from "react";
import type { ProjectCard } from "../common/PublicInterfaces";
import type { TFunction } from "i18next";
import TechnicalDescription from "../common/TechnicalDescription";

type ProjectDetailsProps = {
  selectedProjectIndex: number;
  selectedProject: ProjectCard;
  onPointerOverLink: Dispatch<SetStateAction<string>>;
  onClickLink: (text?: string, isCommand?: boolean, auxResponse?: (...args: never[]) => string[]) => void;
  onClose: () => void;
  t: TFunction<"default", unknown>;
  lang?: string;
};

const fallbackImages = [
  "https://placehold.co/800x500?text=Project+Screenshot+1",
  "https://placehold.co/800x500?text=Project+Screenshot+2",
];

export default function ProjectDetails({selectedProjectIndex, selectedProject, onPointerOverLink, onClickLink, onClose, t, lang}: ProjectDetailsProps) {
  const images = selectedProject.imagesUrl?.length
    ? selectedProject.imagesUrl
    : fallbackImages;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isPortuguese = lang?.startsWith("pt") ?? false;

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  const showPreviousImage = () => {
    setActiveImageIndex((current) => (current - 1 + images.length) % images.length);
  };

  const showNextImage = () => {
    setActiveImageIndex((current) => (current + 1) % images.length);
  };

  const containDialogFocus = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return;

    const focusableElements = event.currentTarget.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href]:not([aria-disabled="true"])'
    );
    const firstElement = focusableElements.item(0);
    const lastElement = focusableElements.item(focusableElements.length - 1);
    if (!firstElement || !lastElement) return;

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const subtitle = isPortuguese
    ? selectedProject.subtitlePt ?? selectedProject.subtitle
    : selectedProject.subtitle;
  const paragraphs = (isPortuguese
    ? selectedProject.fullDescriptionPt ?? selectedProject.fullDescription
    : selectedProject.fullDescription)
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const unavailableWebsiteLabel = t("projectdetails_invalid_website_link", {
    defaultValue: isPortuguese ? "Site indisponível" : "Website not available"
  });
  const unavailableRepositoryLabel = t("projectdetails_invalid_repo_link", {
    defaultValue: isPortuguese ? "Repositório do GitHub indisponível" : "GitHub repository not available"
  });

  return (
    <section
      id="project-details"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-details-title"
      aria-describedby={paragraphs.length > 0 ? "project-details-description" : undefined}
      onKeyDown={containDialogFocus}
    >
      <button
        type="button"
        className="project-details-close"
        onClick={onClose}
        ref={closeButtonRef}
        aria-label={t("projectdetails_close", {
          defaultValue: isPortuguese ? "Fechar detalhes do projeto" : "Close project details"
        })}
        title={t("projectdetails_close", {
          defaultValue: isPortuguese ? "Fechar detalhes do projeto" : "Close project details"
        })}
      >
        ×
      </button>
      <div className="project-details-header">
        <p className="sub-title project-subtitle">
          | <TechnicalDescription text={subtitle} technicalTerms={selectedProject.technologies} />
        </p>
        <h1 className="title notranslate" id="project-details-title" translate="no">{selectedProject.header}</h1>

        <div
          className="image-carousel"
          role="region"
          aria-roledescription={t("projectdetails_carousel_role", {
            defaultValue: isPortuguese ? "carrossel" : "carousel"
          })}
          aria-label={t("projectdetails_carousel_label", {
            defaultValue: isPortuguese
              ? `Capturas de tela do projeto ${selectedProject.header}`
              : `${selectedProject.header} project screenshots`
          })}
        >
          {images.length > 1 && (
            <button
              type="button"
              className="carousel-arrow left"
              onClick={showPreviousImage}
              aria-label={t("projectdetails_previous_image", {
                defaultValue: isPortuguese ? "Mostrar captura de tela anterior" : "Show previous screenshot"
              })}
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
                <figure
                  className="image-carousel-slide"
                  key={`${selectedProjectIndex}-${imageUrl}-${index}`}
                  aria-hidden={index !== activeImageIndex}
                >
                  <img
                    src={imageUrl}
                    alt={t("projectdetails_image_alt", {
                      project: selectedProject.header,
                      index: index + 1,
                      defaultValue: isPortuguese
                        ? `Captura de tela ${index + 1} de ${selectedProject.header}`
                        : `${selectedProject.header} screenshot ${index + 1}`
                    })}
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
              aria-label={t("projectdetails_next_image", {
                defaultValue: isPortuguese ? "Mostrar próxima captura de tela" : "Show next screenshot"
              })}
            >
              ›
            </button>
          )}

          {images.length > 1 && (
            <div className="carousel-indicators">
              {images.map((imageUrl, index) => (
                <button
                  key={`${selectedProjectIndex}-indicator-${imageUrl}-${index}`}
                  type="button"
                  aria-label={t("projectdetails_select_image", {
                    index: index + 1,
                    count: images.length,
                    defaultValue: isPortuguese
                      ? `Mostrar captura de tela ${index + 1} de ${images.length}`
                      : `Show screenshot ${index + 1} of ${images.length}`
                  })}
                  aria-current={index === activeImageIndex ? "true" : undefined}
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="project-details-body">
        <div className="project-description" id="project-details-description">
          {paragraphs.map((paragraph, index) => (
            <p key={`${selectedProjectIndex}-description-${index}`}>
              <TechnicalDescription text={paragraph} technicalTerms={selectedProject.technologies} />
            </p>
          ))}
        </div>

        <h3 className="label">
          <span className="user-at-machine notranslate" translate="no">guest@portfolio:</span>
          <span className="user-at-machine-symbol notranslate" translate="no">~$</span>
          {t("projectdetails_tech_title")}
        </h3>
        <div className="simple-terminal-table">
          {selectedProject.technologies.map((item) => (
            <span className="notranslate" translate="no" key={`pd${selectedProjectIndex}#${item}`}>{item}</span>
          ))}
        </div>

        <h3 className="label project-links-heading">
          <span className="user-at-machine notranslate" translate="no">guest@portfolio:</span>
          <span className="user-at-machine-symbol notranslate" translate="no">~$</span>
          {t("projectdetails_links_title")}
        </h3>
        <div className="available-at">
          <div className="link">
            <a
              href={selectedProject.deployedUrl ?? undefined}
              className={`project-link${selectedProject.deployedUrl ? " active" : " inactive"}`}
              title={selectedProject.deployedUrl ? undefined : unavailableWebsiteLabel}
              aria-label={selectedProject.deployedUrl ? undefined : unavailableWebsiteLabel}
              target={selectedProject.deployedUrl ? "_blank" : undefined}
              rel={selectedProject.deployedUrl ? "noopener noreferrer" : undefined}
              aria-disabled={!selectedProject.deployedUrl}
              onPointerOver={() => onPointerOverLink(`cd --projectIndex ${selectedProjectIndex} website-link`)}
              onPointerOut={() => onPointerOverLink("")}
              onClick={(event) => {
                if (!selectedProject.deployedUrl) event.preventDefault();
                if (selectedProject.githubUrl != null) {
                  onClickLink(`cd --projectIndex ${selectedProjectIndex} github-repository-link`, 
                    true, () => [t("aboutme_redirecting_command") + "website-link..."]);
                }
              }}
              onAuxClick={(event) => {
                if (!selectedProject.githubUrl) event.preventDefault();
                if (selectedProject.githubUrl != null) {
                  onClickLink(`cd --projectIndex ${selectedProjectIndex} github-repository-link`, 
                    true, () => [t("aboutme_redirecting_command") + "website-link..."]);
                }
              }}
            >
              <span className="project-link-label">{t("projectdetails_visit_website")}</span>
              <span className="project-link-arrow" aria-hidden="true">→</span>
            </a>
          </div>

          <div className="link">
            <a
              href={selectedProject.githubUrl ?? undefined}
              className={`project-link${selectedProject.githubUrl ? " active" : " inactive"}`}
              title={selectedProject.githubUrl ? undefined : unavailableRepositoryLabel}
              aria-label={selectedProject.githubUrl ? undefined : unavailableRepositoryLabel}
              target={selectedProject.githubUrl ? "_blank" : undefined}
              rel={selectedProject.githubUrl ? "noopener noreferrer" : undefined}
              aria-disabled={!selectedProject.githubUrl}
              onPointerOver={() => onPointerOverLink(`cd --projectIndex ${selectedProjectIndex} github-repository-link`)}
              onPointerOut={() => onPointerOverLink("")}
              onClick={(event) => {
                if (!selectedProject.githubUrl) event.preventDefault();
                if (selectedProject.githubUrl != null) {
                  onClickLink(`cd --projectIndex ${selectedProjectIndex} github-repository-link`, 
                    true, () => [t("aboutme_redirecting_command") + "github-repository-link..."]);
                }
              }}
              onAuxClick={(event) => {
                if (!selectedProject.githubUrl) event.preventDefault();
                if (selectedProject.githubUrl != null) {
                  onClickLink(`cd --projectIndex ${selectedProjectIndex} github-repository-link`, 
                    true, () => [t("aboutme_redirecting_command") + "github-repository-link..."]);
                }
              }}
            >
              <span className="project-link-label">{t("projectdetails_visit_repo")}</span>
              <span className="project-link-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
