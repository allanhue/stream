import { Suspense } from 'react';
import TrendingSection from '../components/TrendingSection';
import UpcomingMovies from '../components/UpcomingMovies';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <UpcomingMovies />
          <TrendingSection
            type="movie"
            title="Trending Movies"
          />
          
          <TrendingSection
            type="tv"
            title="Trending TV Shows"
          />
          
          <TrendingSection
            type="people"
            title="Trending People"
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;