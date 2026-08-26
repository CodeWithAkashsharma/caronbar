import React from 'react';
import { Check } from 'lucide-react';

const DEFAULT_STEPS = [
  { id: 1, title: 'Service' },
  { id: 2, title: 'Vehicle' },
  { id: 3, title: 'Add-ons' },
  { id: 4, title: 'Address & Contact' },
  { id: 5, title: 'Payment' },
];

export const StepIndicator = ({ currentStep, setStep, steps = DEFAULT_STEPS }) => {
  const activeSteps = steps && steps.length > 0 ? steps : DEFAULT_STEPS;

  return (
    <div className="w-full py-1">
      <div className="flex items-center justify-between w-full max-w-full px-0.5 sm:px-2">
        {activeSteps.map((s, idx) => {
          const isDone = currentStep > s.id;
          const isCurrent = currentStep === s.id;

          return (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-0.5 sm:gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => s.id < currentStep && setStep(s.id)}
                  disabled={s.id > currentStep}
                  className={`w-6 h-6 min-[360px]:w-7 min-[360px]:h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold transition-all duration-300 ${
                    isDone
                      ? 'bg-[#8B182B] text-white shadow-xs cursor-pointer'
                      : isCurrent
                      ? 'bg-white text-[#8B182B] border-2 border-[#8B182B] shadow-xs scale-105'
                      : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  }`}
                >
                  {isDone ? <Check className="w-3 h-3 sm:w-4 sm:h-4 stroke-[3]" /> : s.id}
                </button>
                <span
                  className={`text-[7.5px] min-[360px]:text-[8.5px] sm:text-[10px] uppercase font-display font-extrabold italic tracking-tight sm:tracking-wider whitespace-nowrap ${
                    isCurrent ? 'text-[#8B182B]' : isDone ? 'text-slate-800' : 'text-slate-400'
                  }`}
                >
                  {s.title}
                </span>
              </div>

              {idx < activeSteps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-0.5 sm:mx-1.5 transition-colors ${
                    isDone ? 'bg-[#8B182B]' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
