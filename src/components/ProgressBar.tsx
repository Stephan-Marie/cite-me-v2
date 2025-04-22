import React from 'react';

interface ProgressBarProps {
  progress: number;
  status: 'pending' | 'processing' | 'processed' | 'error';
  label?: string;
  showPercentage?: boolean;
  className?: string;
  height?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  status,
  label,
  showPercentage = true,
  className = '',
  height = 6,
}) => {
  // Normalize progress to be between 0 and 100
  const normalizedProgress = Math.max(0, Math.min(100, progress));
  
  // Determine color based on status
  const getStatusColor = () => {
    switch (status) {
      case 'processing':
        return 'bg-blue-500';
      case 'processed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-300 dark:bg-gray-700';
    }
  };
  
  // Determine any animation based on status
  const getAnimation = () => {
    if (status === 'processing' && normalizedProgress < 100) {
      return 'animate-pulse';
    }
    return '';
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {normalizedProgress.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      
      <div 
        className="w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <div
          className={`${getStatusColor()} ${getAnimation()} transition-all duration-300 ease-in-out`}
          style={{ 
            width: `${normalizedProgress}%`,
            height: '100%',
          }}
        />
      </div>
      
      {status === 'error' && (
        <p className="mt-1 text-xs text-red-500">
          Error processing document. Please try again.
        </p>
      )}
    </div>
  );
};

export default ProgressBar; 