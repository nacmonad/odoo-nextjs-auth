// pages/404.js
import Image from 'next/image';
import Link from 'next/link';

const ErrorPage = ({ statusCode = 503 }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="mb-8">
        <Image
          src="/kitty500.png"
          alt="Error Kitty"
          width={600}
          height={800}
        />
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold mb-2">{statusCode} - Error</p>
        <p className="text-lg">
          {statusCode
            ? `An error ${statusCode} occurred on server.`
            : 'The requested page was not found.'}
        </p>
      </div>
        {/* Link to return to home page */}
        <div className="fixed bottom-0 left-0 mb-4 ml-4">
            <Link className="text-white underline" href="/">Home </Link>
        </div>
    </div>
  );
};


export default ErrorPage;
