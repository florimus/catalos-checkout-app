'use client';

import React from 'react';

const Container: React.FC<{
  children: React.ReactNode;
  [key: string]: unknown;
}> = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: unknown;
}) => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8" {...props}>
      <div className="max-w-7xl mx-auto">
      {children}
      </div>
    </div>
  );
};

export default Container;
