import { useEffect } from 'react';

const CONTAINER_ID = 'container-01ce2ab10d17e099470b0b1e96ed61e2';

const AdsterraNative = ({ className = '' }) => {
  useEffect(() => {
    if (document.getElementById('adsterra-native-script')) return;

    const script = document.createElement('script');
    script.id = 'adsterra-native-script';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://pl29897752.effectivecpmnetwork.com/01ce2ab10d17e099470b0b1e96ed61e2/invoke.js';
    document.body.appendChild(script);
  }, []);

  return (
    <div className={`flex justify-center ${className}`}>
      <div id={CONTAINER_ID} />
    </div>
  );
};

export default AdsterraNative;
