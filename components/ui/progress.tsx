'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';
import { Truck } from 'lucide-react';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <>
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-900',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-gray-900 dark:bg-gray-200 transition-all relative"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
      {/* Icon that moves with progress */}
    </ProgressPrimitive.Root>
    <div
      className={cn(
        "absolute transform -translate-y-1/2 p-1 rounded-full",
        value === 100 ? "bg-green-500" : "bg-blue-500"
      )}
      style={{
        top: `calc(50% + 2px)`,
        left: `calc(${value ?? 0}% - 10px)`, // Position icon based on progress 
        display: (value ?? 0) > 0 ? "block" : "none",
      }}
    >
      <Truck className={`h-5 w-5 ${value === 100 ? "text-green-500" : "text-blue-500"}`} fill={"white"} />
    </div>
  </>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
