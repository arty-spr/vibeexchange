import { useState, useEffect } from 'react';
import { useTutorial } from '../context/TutorialContext';
import { X, Lightbulb, ArrowRight } from 'lucide-react';

const TutorialTooltip = ({ stepId, title, description, position = 'bottom' }) => {
  const { isTutorialMode, isStepCompleted, completeStep } = useTutorial();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isTutorialMode && !isStepCompleted(stepId)) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTutorialMode, isStepCompleted, stepId]);

  const handleClose = () => {
    setIsVisible(false);
    completeStep(stepId);
  };

  if (!isTutorialMode || isStepCompleted(stepId) || !isVisible) {
    return null;
  }

  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2'
  };

  return (
    <div className={`absolute ${positionClasses[position]} z-50 w-80`}>
      <div className="bg-primary-600 dark:bg-primary-500 text-white rounded-lg shadow-xl p-4 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3 mb-3">
          <Lightbulb className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-lg mb-1">{title}</h3>
            <p className="text-sm text-white/90">{description}</p>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="flex items-center gap-2 text-sm font-medium hover:underline"
        >
          Got it
          <ArrowRight className="h-4 w-4" />
        </button>

        {position === 'bottom' && (
          <div className="absolute -top-2 left-6 w-4 h-4 bg-primary-600 dark:bg-primary-500 transform rotate-45"></div>
        )}
        {position === 'top' && (
          <div className="absolute -bottom-2 left-6 w-4 h-4 bg-primary-600 dark:bg-primary-500 transform rotate-45"></div>
        )}
      </div>
    </div>
  );
};

export default TutorialTooltip;