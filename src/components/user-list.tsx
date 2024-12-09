import React from 'react';
import { User } from '@/services/http/users-http.service';
import getPastelColor from '@/shared/utils/get-pastel-color.util';

interface UsersListProps {
  users: User[];
  onSelectUser: (user: User) => void;
  loading: boolean;
  onlineUsers: string[];
  unreadMessages: Record<string, number>;
}

const UsersList: React.FC<UsersListProps> = ({ users, onSelectUser, loading, onlineUsers, unreadMessages }) => {
  if (loading) {
    return <div className="bg-gray-100 p-4 border-r overflow-y-auto">Carregando usuários...</div>;
  }

  return (
    <div className="bg-gray-100 p-4 border-r overflow-y-auto">
      <p className="text-black font-semibold mb-4">Total de usuários: {users.length}</p>
      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user.username}
            className="mb-4 cursor-pointer"
            onClick={() => onSelectUser(user)}
          >
            <div className="flex items-center p-2 rounded-lg hover:bg-blue-100 bg-gray-200">
              <div className="relative">
                <div 
                  className="w-12 h-12 relative rounded-full flex items-center justify-center"
                  style={{ backgroundColor: getPastelColor(user.username) }}
                >
                  <div 
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                      ${onlineUsers.includes(user.username) ? 'bg-green-400' : 'bg-gray-400'}`} 
                  />
                  
                  {unreadMessages[user.username] > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                      <span className="text-xs text-white font-bold">
                        {unreadMessages[user.username]}
                      </span>
                    </div>
                  )}
                  
                  <span className="text-xl text-gray-700 font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <h2 className="font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500">
                  @{user.username}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}
    </div>
  );
};

export default UsersList;