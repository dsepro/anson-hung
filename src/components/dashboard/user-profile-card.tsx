
"use client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserProfileCardProps {
  user: {
    name: string;
    condition: string;
    avatarUrl?: string;
  };
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  return (
    <Card>
      <CardContent className="pt-6 flex items-center gap-4">
        <Avatar className="h-12 w-12" data-ai-hint="profile avatar">
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-md font-semibold">{user.name}</h3>
          <p className="text-xs text-muted-foreground">{user.condition}</p>
        </div>
      </CardContent>
    </Card>
  );
}
