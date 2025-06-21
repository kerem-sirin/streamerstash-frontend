import React from 'react';

const Slider = ({ label, min, max, step, minValue, maxValue, onValueChange }) => {
    const minValuePercent = (minValue / max) * 100;
    const maxValuePercent = (maxValue / max) * 100;

    return (
        <div className="mb-6 pt-4">
            {/* This style tag is a workaround to make the top slider's thumb interactive while its track is not. */}
            <style>
                {`
                    input[type=range].slider-thumb-fix::-webkit-slider-thumb {
                       pointer-events: auto;
                    }
                    input[type=range].slider-thumb-fix::-moz-range-thumb {
                       pointer-events: auto;
                    }
                `}
            </style>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
            <div className="flex justify-between items-center text-sm dark:text-gray-300">
                <span>£{parseInt(minValue) / 100}</span>
                <span>£{parseInt(maxValue) / 100}{maxValue >= max ? '+' : ''}</span>
            </div>
            <div className="relative h-5 flex items-center">
                <div className="relative w-full h-1 bg-gray-200 dark:bg-gray-600 rounded-full">
                    <div className="absolute h-1 bg-primary rounded-full" style={{ left: `${minValuePercent}%`, right: `${100 - maxValuePercent}%` }}></div>
                </div>
                {/* The bottom slider is fully interactive */}
                <input type="range" name="minPrice" min={min} max={max} step={step} value={minValue} onChange={onValueChange} className="absolute w-full h-1 appearance-none bg-transparent pointer-events-auto" />
                {/* The top slider's track is non-interactive, but its thumb is made interactive via the style tag. */}
                <input type="range" name="maxPrice" min={min} max={max} step={step} value={maxValue} onChange={onValueChange} className="slider-thumb-fix absolute w-full h-1 appearance-none bg-transparent pointer-events-none" />
            </div>
        </div>
    );
};

export default Slider;
