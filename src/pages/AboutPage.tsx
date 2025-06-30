import PageHeading from '../components/common/PageHeading';

const AboutPage = () => {
  return (
    <div className="w-full mx-auto space-y-4 mt-8 flex max-w-5xl gap-6 flex-col mb-12">
      <PageHeading title="Tech Stack" />
      <h4 className="text-2xl">Framework</h4>
      <p className="pl-4">ReactJS + Vite</p>
      <h4 className="text-2xl">Deployment</h4>
      <p className="pl-4">Vercel</p>
      <h4 className="text-2xl">Back End</h4>
      <p className="pl-4">Supabase for authentication and database</p>
      <p className="pl-4">OAuth with Github. </p>
      <p className="pl-4">Signup with Email</p>
      <h2 className="text-4xl">Libraries</h2>
      <p className="pl-4">TailwindCss styling</p>
      <p className="pl-4">EditorJS for blog content</p>
    </div>
  );
};

export default AboutPage;
