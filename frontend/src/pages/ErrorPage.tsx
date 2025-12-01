import { useRouteError, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, RefreshCw } from 'lucide-react';

export default function ErrorPage() {
  const error = useRouteError() as any;

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-destructive">
            Oops! Something went wrong
          </CardTitle>
          <CardDescription>
            {error?.status === 404
              ? "The page you're looking for doesn't exist."
              : "An unexpected error occurred."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error?.statusText && (
            <div className="text-sm text-muted-foreground text-center">
              <strong>Error:</strong> {error.statusText}
            </div>
          )}
          
          <div className="flex flex-col space-y-2">
            <Button onClick={handleRefresh} variant="default" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}