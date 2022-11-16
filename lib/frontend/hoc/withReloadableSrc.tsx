import React, { useEffect, useState } from 'react';

function parseUrl(url: string) {
  return new URL(url);
}

export function useReloadableSrc(rawSrc: string) {
  const [src, setSrc] = useState({ src: rawSrc, lastUpdated: new Date() });

  useEffect(() => {
    const interval = setInterval(() => {
      const newSrc = parseUrl(rawSrc);
      newSrc.searchParams.append('_', `${new Date().getTime()}`);
      setSrc({
        src: newSrc.toString(),
        lastUpdated: new Date(),
      });
    });
    return () => {
      clearInterval(interval);
    };
  }, []);
  return src;
}
