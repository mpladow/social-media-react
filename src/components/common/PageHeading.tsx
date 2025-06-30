const PageHeading = ({ title, noPadding }: { title: string; noPadding?: boolean }) => {
  return (
    <h2
      className={`text-5xl text-left bg-gradient-to-br from-purple-300 to-blue-100 text-transparent bg-clip-text font-bold mb-4 overflow-visible ${
        noPadding ? 'pb-0' : 'pb-3'
      }`}
    >
      {title}
    </h2>
  );
};

export default PageHeading;
