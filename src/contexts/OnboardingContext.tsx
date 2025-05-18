import { createContext, ReactNode, useContext, useState } from 'react';

interface OnboardingContextType {
    cuisines: string[];
    setCuisines: (c: string[]) => void;
    goals: string[];
    setGoals: (g: string[]) => void;
    dietaryRequirements: string[];
    setDietaryRequirements: (d: string[]) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
    const [cuisines, setCuisines] = useState<string[]>([]);
    const [goals, setGoals] = useState<string[]>([]);
    const [dietaryRequirements, setDietaryRequirements] = useState<string[]>([]);

    return (
        <OnboardingContext.Provider value={{ 
            cuisines, 
            setCuisines, 
            goals, 
            setGoals,
            dietaryRequirements,
            setDietaryRequirements
        }}>
            {children}
        </OnboardingContext.Provider>
    );
}

export function useOnboarding() {
    const ctx = useContext(OnboardingContext);
    if (!ctx) throw new Error('useOnboarding must be used inside OnboardingProvider');
    return ctx;
}