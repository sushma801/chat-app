import React, { lazy, Suspense } from 'react';

const Sidebar = lazy(() => import('../components/Sidebar'));
const MessageContainer = lazy(() => import('../components/MessageContainer'));

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-white">
      <Suspense fallback={<span className="loading" />}>
        <Sidebar />
        <MessageContainer />
      </Suspense>
    </div>
  );
};

export default Home;
