import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main className='container max-w-[800px] mx-auto px-4 py-8'>
        <Outlet />
      </main>
    </div>
  );
}
