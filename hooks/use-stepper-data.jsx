import { useState, useEffect, useCallback } from 'react';

export function useStepperData(steps) {
  const [currentStepData, setCurrentStepData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const loadStepData = useCallback(async (indexOrId) => {
    const step = typeof indexOrId === 'number' 
      ? steps[indexOrId] 
      : steps.find(s => s.id === indexOrId);

    if (!step?.endpoint) {
      setCurrentStepData(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/proxy', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          uri: step.endpoint, 
          method: 'GET' 
        })
      });

      const result = await response.json();
      
      if (!response.ok) throw new Error(result.message || 'Failed to load data');
      
      setCurrentStepData(result);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      setCurrentStepData(null);
    } finally {
      setIsLoading(false);
    }
  }, [steps]);

  const goToNext = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      loadStepData(nextIndex);
    }
  }, [currentStepIndex, steps, loadStepData]);

  const goToPrev = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      loadStepData(prevIndex);
    }
  }, [currentStepIndex, steps, loadStepData]);

  useEffect(() => {
    if (steps.length > 0) {
      loadStepData(0);
    }
  }, []);

  return {
    currentStepData,
    currentStepIndex,
    isLoading,
    loadStepData,
    error,
    goToNext,
    goToPrev,
    setCurrentStepIndex 
  };
}