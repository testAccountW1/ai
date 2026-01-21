import { forwardRef, type InputHTMLAttributes } from 'react';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  displayValue?: string;
  min: number;
  max: number;
  step?: number;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ label, displayValue, min, max, step = 1, className = '', id, value, ...props }, ref) => {
    const sliderId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const percentage = ((Number(value) - min) / (max - min)) * 100;

    return (
      <div className="w-full">
        {(label || displayValue) && (
          <div className="flex justify-between items-center mb-3">
            {label && (
              <label htmlFor={sliderId} className="text-sm font-medium text-gray-700">
                {label}
              </label>
            )}
            {displayValue && (
              <span className="text-2xl font-bold text-primary-600">{displayValue}</span>
            )}
          </div>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={sliderId}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            className={`w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-6
              [&::-webkit-slider-thumb]:h-6
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-primary-600
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:duration-150
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-moz-range-thumb]:w-6
              [&::-moz-range-thumb]:h-6
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-primary-600
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:transition-transform
              [&::-moz-range-thumb]:duration-150
              [&::-moz-range-thumb]:hover:scale-110
              focus:outline-none
              ${className}`}
            style={{
              background: `linear-gradient(to right, #2563eb 0%, #2563eb ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
            }}
            {...props}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>{min.toLocaleString()}</span>
          <span>{max.toLocaleString()}</span>
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
