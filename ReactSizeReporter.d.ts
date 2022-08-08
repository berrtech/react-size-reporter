import React, { ReactNode } from 'react';

declare const MyComponent: React.FC<{
  children: ReactNode;
  onSizeChange: (newDimensions: { height: number; width: number }) => void;
}>;

export default MyComponent;
