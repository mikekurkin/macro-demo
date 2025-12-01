import { Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link to='/' className='flex items-center space-x-2'>
          <Database className='h-6 w-6' />
          <span className='text-xl font-bold'>Macro Demo</span>
        </Link>
      </div>
    </header>
  );
}
