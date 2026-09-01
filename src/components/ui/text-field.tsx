import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export type TextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({ label, value, onChange, id, className, ...props }, ref) {
    const inputId =
      id ?? `text-field-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="text-sm font-medium text-navy">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            'rounded-md border border-gray px-3 py-2 text-base text-black',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy',
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
