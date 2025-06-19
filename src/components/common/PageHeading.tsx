import React from 'react';

const PageHeading = ({ title }: { title: string }) => {
  return (
    <h2 className="text-5xl text-center bg-gradient-to-br from-purple-400 to-blue-500 text-transparent bg-clip-text font-bold mb-4">
      {title}
    </h2>
  );
};

export default PageHeading;
