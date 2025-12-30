import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StreamGrid from '../components/StreamGrid';
import FilterBar from '../components/FilterBar';
import Footer from '../components/Footer';
import { mockStreams } from '../data/mockData';
import useStatsStore from '../store/statsStore';

export default function HomePage() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedGame, setSelectedGame] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const recordVisit = useStatsStore((state) => state.recordVisit);
  const decrementViewers = useStatsStore((state) => state.decrementViewers);

  // تسجيل الزيارة عند دخول الصفحة
  useEffect(() => {
    recordVisit();
    
    // تقليل عدد المشاهدين عند مغادرة الصفحة
    return () => {
      decrementViewers();
    };
  }, [recordVisit, decrementViewers]);

  // Filter streams based on selections
  const filteredStreams = mockStreams.filter(stream => {
    const matchesPlatform = selectedPlatform === 'all' || stream.platform.toLowerCase() === selectedPlatform;
    const matchesGame = selectedGame === 'all' || stream.game === selectedGame;
    const matchesSearch = searchQuery === '' || 
      stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.streamer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.game.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesPlatform && matchesGame && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={setSearchQuery} />
      <HeroSection />
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar 
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
        />
        <StreamGrid streams={filteredStreams} />
      </div>
      <Footer />
    </div>
  );
}