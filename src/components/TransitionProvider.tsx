"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";

export default function TransitionProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [prevPathname, setPrevPathname] = useState(pathname);

    useEffect(() => {
        if (pathname !== prevPathname) {
            setIsTransitioning(true);
            setPrevPathname(pathname);
        }
    }, [pathname, prevPathname]);

    return (
        <>
            {isTransitioning && (
                <LoadingScreen
                    isTransition={true}
                    onFinished={() => setIsTransitioning(false)}
                />
            )}
            {children}
        </>
    );
}
