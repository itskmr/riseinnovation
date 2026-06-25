import { useEffect, useRef } from 'react';

const AdsterraBanner = ({ adKey, width, height, className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    window.atOptions = {
      key: adKey,
      format: 'iframe',
      height,
      width,
      params: {},
    };

    const script = document.createElement('script');
    script.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    script.async = true;
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [adKey, width, height]);

  return (
    <div className={`flex justify-center overflow-hidden ${className}`} ref={containerRef} />
  );
};

export default AdsterraBanner;
