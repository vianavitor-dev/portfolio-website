import type { ProjectCard } from "../common/PublicInterfaces";
import { useEffect, useState } from "react";
import projectImage from "../assets/Dark Coding Workspace with Neon Accents.png";

export default function useProjectDataReader() {
    const [data, setData] = useState<ProjectCard[]>([]); 

    useEffect(() => {
        if (data.length > 0) {
            return;
        }

        fetch("/projects.json")
        .catch(error => new Error("Error when trying to fetch projects data: " + error))
        .then((response: Response | Error) => {
            const resp = response as Response;

            if (!resp.ok) {
                new Error("Response HTTP Status were not OK; " + resp.status);
            }

            return resp.json();
        })
        .catch(error => new Error("Error when parsing response to JSON type: " + error))
        .then(respJson => {
            // console.log("respJson: ", respJson);
            setData((respJson as ProjectCard[]).map(project => ({
                ...project,
                imagesUrl: project.imagesUrl.length > 0 ? project.imagesUrl : [projectImage]
            })));
        })
    }, []);

    return data;
}