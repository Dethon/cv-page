import { useState, useEffect, useRef } from 'react';

/**
 * Hook to detect which section is currently active based on scroll position
 * Uses IntersectionObserver for efficient scroll-spy functionality
 *
 * @param sectionIds - Array of section IDs to observe (must be stable - use useMemo or constant)
 * @returns The ID of the currently active section
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Track which sections are currently intersecting
    const intersectingEntries = new Map<string, IntersectionObserverEntry>();

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Update the map with current intersection states
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectingEntries.set(entry.target.id, entry);
        } else {
          intersectingEntries.delete(entry.target.id);
        }
      });

      // Find the most visible section
      if (intersectingEntries.size > 0) {
        const mostVisible = Array.from(intersectingEntries.values())
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible) {
          setActiveSection(mostVisible.target.id);
        }
      }
    };

    // Create observer with options for optimal detection
    observerRef.current = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1.0],
    });

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    // Cleanup function - CRITICAL for memory leak prevention
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      intersectingEntries.clear();
    };
  }, [sectionIds]);

  return activeSection;
}
