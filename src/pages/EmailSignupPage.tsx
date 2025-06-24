import PageHeading from '../components/common/PageHeading';
import CreateAccount from '../components/CreateAccount/CreateAccount';

const EmailSignupPage = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-4 mt-8">
      <PageHeading title="Create Account" />
      <CreateAccount />
    </div>
  );
};

export default EmailSignupPage;
