import React from 'react';

type LabelProps = {} & React.HTMLAttributes<HTMLLabelElement>;

const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label className="text-lg font-semibold mb-2" {...props}>
      {children}
    </label>
  );
};

export default Label;
