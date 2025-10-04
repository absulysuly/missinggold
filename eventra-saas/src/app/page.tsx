import CategoryGrid from './components/CategoryGrid';
import Header from './components/Header';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <Header />
      <CategoryGrid />
    </main>
  );
}