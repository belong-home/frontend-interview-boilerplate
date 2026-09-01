import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'onChange'
> & {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { label, value, options, onChange, id, className, ...props },
    ref,
  ) {
    const selectId = id ?? `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={selectId} className="text-sm font-medium text-navy">
          {label}
        </label>
        <select
          ref={ref}
          id={selectId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            'rounded-md border border-gray bg-white px-3 py-2 text-base text-black',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy',
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  },
);
