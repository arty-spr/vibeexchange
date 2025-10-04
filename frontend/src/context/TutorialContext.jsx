import { createContext, useState, useContext, useEffect } from 'react';

const TutorialContext = createContext(null);

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within TutorialProvider');
  }
  return context;
};

export const TutorialProvider = ({ children }) => {
  const [isTutorialMode, setIsTutorialMode] = useState(() => {
    const saved = localStorage.getItem('tutorialMode');
    return saved ? saved === 'true' : true;
  });

  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('completedTutorialSteps');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tutorialMode', isTutorialMode);
  }, [isTutorialMode]);

  useEffect(() => {
    localStorage.setItem('completedTutorialSteps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  const toggleTutorialMode = () => {
    setIsTutorialMode(!isTutorialMode);
  };

  const completeStep = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const resetTutorial = () => {
    setCompletedSteps([]);
    setIsTutorialMode(true);
  };

  const value = {
    isTutorialMode,
    toggleTutorialMode,
    completedSteps,
    completeStep,
    resetTutorial,
    isStepCompleted: (stepId) => completedSteps.includes(stepId)
  };

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
};