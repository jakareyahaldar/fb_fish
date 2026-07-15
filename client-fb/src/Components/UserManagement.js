import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

// Sample mock data matching MongoDB fields
// const MOCK_USERS = [
//   { id: '1', email: 'alex.jones@admin.com', phone: '+1 (555) 234-5678', code: 'USR-8842', createdAt: '2026-07-01T10:30:00.000Z' },
//   { id: '2', email: 'sarah.m@company.org', phone: '+1 (555) 987-6543', code: 'USR-1102', createdAt: '2026-07-03T14:15:22.000Z' },
//   { id: '3', email: 'david.k@techcorp.io', phone: '+44 20 7946 0192', code: 'USR-4931', createdAt: '2026-07-05T08:05:11.000Z' },
//   { id: '4', email: 'elena.rodriguez@domain.com', phone: '+34 91 363 5621', code: 'USR-7729', createdAt: '2026-07-08T19:42:00.000Z' },
// ];

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  async function getUser(){
    const { data, error } = await supabase
        .from('users')
        .select()

       

    if(!error){
      setUsers(data)
    }
  }

  useEffect(()=>{
    getUser()
  },[])

  // Helper to format MongoDB ISO Date string safely
  const formatMongoDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return isoString;
    }
  };

  // Filter users based on search string
  const filteredUsers = users.filter(user =>  true);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">System Users</h1>
            <p className="text-sm text-slate-400">Manage, inspect, and audit registered user accounts.</p>
          </div>
          
          {/* Custom Search Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by email, code, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Main Grid: Left side Table, Right side Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* User List Table Panel */}
          <div className={`${selectedUser ? 'lg:col-span-2' : 'lg:col-span-3'} bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl transition-all`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/50 border-b border-slate-700 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="px-6 py-4">User Code</th>
                    <th className="px-6 py-4">Username</th>
                    <th className="px-6 py-4 hidden sm:table-cell">Password</th>
                    <th className="px-6 py-4 hidden md:table-cell">Created At</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr 
                        key={user.id} 
                        className={`hover:bg-slate-750/40 transition-colors ${selectedUser?.id === user.id ? 'bg-blue-600/10' : ''}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-400 font-medium">
                          {user.code && JSON.parse(user.code).join("")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                          {user.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 hidden sm:table-cell">
                          {user?.password}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 hidden md:table-cell">
                          {user.created_at}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-blue-600 text-white rounded-md text-xs font-medium transition-all"
                          >
                            View Details
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-10 text-sm text-slate-500">
                        No users found matching your search parameters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Details Sidebar Panel */}
          {selectedUser && (
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-xl p-6 sticky top-6 animate-fadeIn">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  User Inspect Card
                </h3>
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Information Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    System Code
                  </label>
                  <div className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-mono text-blue-400 select-all">
                    {selectedUser.code}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Username
                  </label>
                  <div className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white select-all">
                    {selectedUser.username}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-200">
                    {selectedUser.password}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Created On (MongoDB Timestamp)
                  </label>
                  <div className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-300 flex flex-col gap-0.5">
                    <span className="font-medium text-slate-200">{formatMongoDate(selectedUser.createdAt)}</span>
                    <span className="text-xs font-mono text-slate-500 select-all">{selectedUser.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Footer action */}
              <div className="mt-6 pt-4 border-t border-slate-700 flex justify-end">
                <button 
                  onClick={() => alert(`Editing profile: ${selectedUser.code}`)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-medium rounded-lg text-sm transition-all shadow-md shadow-blue-600/10"
                >
                  Edit Configuration
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}