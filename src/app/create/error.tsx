'use client';
 
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
 
export default function Error({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
  const router = useRouter()

  return (
    <main className="flex min-h-96 mt-16 flex-col items-center justify-center">
      <h2 className="text-center mb-8">{error.message}</h2>
        <Button onClick={() => reset()}>
            Try again
        </Button>
    </main>
  );
}