// error.tsx
'use client'
import Image from 'next/image';
import Link from '../../node_modules/next/link';

const Error = ({ error, reset }: { error: Error, reset: ()=>void }) => {
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
        <p className="text-3xl font-bold mb-2">{error.name}</p>
        <p className="text-lg">
          {error
            ? `${error.message}`
            : 'There was an issue on the server -- contact the administrator.'}
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 my-2 mx-1 rounded-md">Reset</button>
      </div>
        {/* Link to return to home page */}
        <div className="fixed bottom-0 left-0 mb-4 ml-4">
            <Link className="text-white underline" href="/">Home </Link>
        </div>
    </div>
  );
};


export default Error;
