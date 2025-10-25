import { useGlitch } from 'react-powerglitch';

interface GlitchVideoProps {
  src: string;
  className: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const GlitchVideo = ({ src, className, onClick }: GlitchVideoProps) => {
  const glitch = useGlitch({
    glitchTimeSpan: {
      start: 0.1,
      end: 0.9
    },
    shake: {
      velocity: 20,
      amplitudeX: 0.2,
      amplitudeY: 0.2
    },
    slice: {
      count: 15,
      velocity: 25,
      minHeight: 0.02,
      maxHeight: 0.15,
      hueRotate: true
    },
    pulse: {
      scale: 1.1
    },
    timing: {
      duration: 2000,
      iterations: Infinity
    },
    playMode: 'always'
  });

  return (
    <video 
      ref={glitch.ref}
      className={className}
      autoPlay 
      loop 
      muted
      onClick={onClick}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};