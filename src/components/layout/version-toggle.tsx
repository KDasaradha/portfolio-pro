'use client';

import { useVersion } from '@/context/version-context';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sparkles, Briefcase } from 'lucide-react'; 

export default function VersionToggle() {
  const { version, setVersion } = useVersion();

  const handleToggle = (checked: boolean) => {
    setVersion(checked ? 'v2' : 'v1');
  };

  return (
    <div className="flex items-center space-x-2" data-cursor-interactive>
      {version === 'v1' ? (
        <Briefcase className="h-4 w-4 text-muted-foreground transition-all duration-300" />
      ) : (
        <Sparkles className="h-4 w-4 text-accent transition-all duration-300 animate-pulse" />
      )}
      <Label 
        htmlFor="version-toggle" 
        className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${version === 'v2' ? 'text-accent font-semibold' : 'text-muted-foreground'}`}
      >
        {version === 'v1' ? 'Classic View' : 'Modern View'}
      </Label>
      <Switch
        id="version-toggle"
        checked={version === 'v2'}
        onCheckedChange={handleToggle}
        aria-label="Toggle portfolio version"
        className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-primary/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      />
    </div>
  );
}
