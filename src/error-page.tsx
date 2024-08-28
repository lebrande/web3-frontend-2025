import { Navbar } from '@/components/Navbar';
import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div id="error-page">
      <Navbar />
      <div className="space-y-2 max-w-80 mx-auto my-24 text-center">
        <h1 className="font-semibold text-4xl">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>
            {/* @ts-ignore */}
            {error.status} {error.statusText || error.message}
          </i>
        </p>
      </div>
    </div>
  );
};
