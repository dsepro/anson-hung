
"use client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface UserProfileCardProps {
  user: {
    name: string;
    condition: string;
    avatarUrl?: string;
    avatarFallback: string;
  };
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <Card className="shadow-md">
      <CardContent className="pt-6 flex items-center gap-4">
        <Avatar className="h-12 w-12" data-ai-hint="profile avatar user">
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
          <AvatarFallback className="text-lg bg-primary text-primary-foreground">{user.avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-md font-semibold">{user.name}</h3>
          <p className="text-xs text-muted-foreground">{user.condition}</p>
        </div>
      </CardContent>
    </Card>
  );
}

    