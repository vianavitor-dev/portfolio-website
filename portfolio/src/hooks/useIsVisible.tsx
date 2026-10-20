import { useEffect, useState } from "react";

export default function useIsVisible(ref: React.RefObject<HTMLElement>) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        })

        observer.observe(ref.current);

        return (() => {
            observer.disconnect();
        });
    }, [ref]);
    
    console.log("isIntersecting: ", isIntersecting);
    return isIntersecting;
}