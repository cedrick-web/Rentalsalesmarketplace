import { MessageSquare, Search, MoreVertical, Phone, Video } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { mockUsers } from '../../../data/mockData';

export function InboxPage() {
  const { t } = useTranslation();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const chats = mockUsers.map((user, index) => ({
    id: user.id,
    user,
    lastMessage: index === 0 ? 'Mwaramutse! Imodoka irahari?' : 'Murakoze cyane!',
    timestamp: new Date(Date.now() - index * 3600000),
    unread: index === 0 ? 2 : 0,
  }));

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  return (
    <div className="container mx-auto px-0 h-[calc(100vh-180px)]">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full border-t">
        {/* Chat List */}
        <div className="border-r">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={`${t('search')}...`} className="pl-10" />
            </div>
          </div>
          <ScrollArea className="h-[calc(100%-80px)]">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full p-4 flex items-center gap-3 border-b hover:bg-secondary/50 transition-colors ${
                  selectedChat === chat.id ? 'bg-secondary' : ''
                }`}
              >
                <Avatar>
                  <AvatarImage src={chat.user.avatar} />
                  <AvatarFallback>{chat.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{chat.user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {chat.timestamp.toLocaleTimeString('rw-RW', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Window */}
        <div className="col-span-2 flex flex-col">
          {selectedChatData ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedChatData.user.avatar} />
                    <AvatarFallback>{selectedChatData.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold">{selectedChatData.user.name}</div>
                    <div className="text-xs text-muted-foreground">Kuri murandasi</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedChatData.user.avatar} />
                      <AvatarFallback>{selectedChatData.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="bg-secondary rounded-lg p-3 max-w-[70%]">
                      <p>Mwaramutse! Imodoka irahari kuri iyi tariki?</p>
                      <span className="text-xs text-muted-foreground">10:30</span>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[70%]">
                      <p>Yego, irahari! Wifuza kuyikodesha ryari?</p>
                      <span className="text-xs opacity-80">10:32</span>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('typeMessage')}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && message.trim()) {
                        setMessage('');
                      }
                    }}
                  />
                  <Button>{t('sendMessage')}</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4" />
                <p>Hitamo ikiganiro kugira ngo utangire</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
