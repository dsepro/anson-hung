
"use client";
import { Avatar } from '@/components/ui/avatar'; // Removed AvatarImage, AvatarFallback
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react'; // Added User icon

interface UserProfileCardProps {
  user: {
    name: string;
    condition: string;
    // avatarUrl?: string; // No longer used for display
    // avatarFallback: string; // No longer used for display
  };
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <Card className="shadow-md">
      <CardContent className="pt-6 flex items-center gap-4">
        <Avatar className="h-12 w-12 bg-primary text-primary-foreground flex items-center justify-center" data-ai-hint="profile avatar user">
          <User className="h-7 w-7" />
        </Avatar>
        <div>
          <h3 className="text-md font-semibold">{user.name}</h3>
          <p className="text-xs text-muted-foreground">{user.condition}</p>
        </div>
      </CardContent>
    </Card>
  );
}
