import { useGlitch } from 'react-powerglitch';

interface GlitchFormulaProps {
  children: React.ReactNode;
  className: string;
}

export const GlitchFormula = ({ children, className }: GlitchFormulaProps) => {
  const glitch = useGlitch({
    glitchTimeSpan: {
      start: 0.05,
      end: 0.15
    },
    shake: {
      velocity: 5,
      amplitudeX: 0.03,
      amplitudeY: 0.02
    },
    slice: {
      count: 6,
      velocity: 8,
      minHeight: 0.01,
      maxHeight: 0.03,
      hueRotate: true
    },
    pulse: {
      scale: 1.02
    },
    timing: {
      duration: 4000,
      iterations: Infinity
    },
    playMode: 'always'
  });

  return (
    <div ref={glitch.ref} className={className}>
      {children}
    </div>
  );
};