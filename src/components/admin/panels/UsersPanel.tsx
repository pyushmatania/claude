import React, { useState, useMemo } from 'react';
import { 
  Search, 
  UserCheck,
  UserX,
  Mail,
  Calendar,
  DollarSign,
  TrendingUp,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useTheme } from '../../ThemeProvider';
import { useAdmin, User } from '../AdminContext';
import ConfirmDialog from '../shared/ConfirmDialog';
import DataTable from '../shared/DataTable';
import { Column } from 'react-table';
import { useToast } from '../../../hooks/useToast';

const UsersPanel: React.FC = () => {
  const { theme } = useTheme();
  const { users, updateUserStatus } = useAdmin();
  const { toast } = useToast();
  
  const [userToActivate, setUserToActivate] = useState<string | null>(null);
  const [userToDeactivate, setUserToDeactivate] = useState<string | null>(null);
  const [userToBan, setUserToBan] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Type-safe valid sort fields
  const validSortFields: (keyof User)[] = [
    'createdAt', 'name', 'email', 'role', 'status', 'investmentCount', 'totalInvested'
  ];

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    return users
      .filter(user => {
        // Search term filter
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             user.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Status filter
        const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
        
        // Role filter
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        
        return matchesSearch && matchesStatus && matchesRole;
      })
      .sort((a, b) => {
        if (validSortFields.includes(sortField as keyof User)) {
          const key = sortField as keyof User;
          if (key === 'createdAt') {
            return sortDirection === 'asc'
              ? new Date(a[key] as string).getTime() - new Date(b[key] as string).getTime()
              : new Date(b[key] as string).getTime() - new Date(a[key] as string).getTime();
          }
          if (typeof a[key] === 'number' && typeof b[key] === 'number') {
            return sortDirection === 'asc'
              ? (a[key] as number) - (b[key] as number)
              : (b[key] as number) - (a[key] as number);
          }
          return sortDirection === 'asc'
            ? String(a[key]).localeCompare(String(b[key]))
            : String(b[key]).localeCompare(String(a[key]));
        }
        return 0;
      });
  }, [users, searchTerm, filterStatus, filterRole, sortField, sortDirection]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleActivateConfirm = () => {
    if (userToActivate) {
      try {
        updateUserStatus(userToActivate, 'active');
        toast.success('User activated');
      } catch (error) {
        toast.error('Error activating user', error instanceof Error ? error.message : 'An unexpected error occurred');
      }
      setUserToActivate(null);
    }
  };

  const handleDeactivateConfirm = () => {
    if (userToDeactivate) {
      try {
        updateUserStatus(userToDeactivate, 'inactive');
        toast.success('User deactivated');
      } catch (error) {
        toast.error('Error deactivating user', error instanceof Error ? error.message : 'An unexpected error occurred');
      }
      setUserToDeactivate(null);
    }
  };

  const handleBanConfirm = () => {
    if (userToBan) {
      try {
        updateUserStatus(userToBan, 'banned');
        toast.success('User banned');
      } catch (error) {
        toast.error('Error banning user', error instanceof Error ? error.message : 'An unexpected error occurred');
      }
      setUserToBan(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'banned':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const columns: Column<User>[] = [
    {
      Header: 'User',
      accessor: 'name',
      Cell: ({ row }) => (
        <div>
          <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            {row.original.name}
          </p>
          <div className="flex items-center gap-2">
            <Mail className={`w-3 h-3 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`} />
            <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              {row.original.email}
            </span>
          </div>
        </div>
      )
    },
    {
      Header: 'Role',
      accessor: 'role',
      Cell: ({ value }) => (
        <span className={`capitalize px-2 py-1 rounded-full text-xs ${
          value === 'admin' 
            ? theme === 'light' ? 'bg-purple-100 text-purple-700' : 'bg-purple-900/30 text-purple-400'
            : theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/30 text-blue-400'
        }`}>
          {value}
        </span>
      )
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(value)}
          <span className={`capitalize ${
            value === 'active' ? 'text-green-500' :
            value === 'inactive' ? 'text-yellow-500' :
            'text-red-500'
          }`}>
            {value}
          </span>
        </div>
      )
    },
    {
      Header: 'Investments',
      accessor: 'investmentCount',
      Cell: ({ row }) => (
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className={`w-4 h-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`} />
            <span className={theme === 'light' ? 'text-gray-900' : 'text-white'}>
              {row.original.investmentCount}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <DollarSign className={`w-4 h-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`} />
            <span className={theme === 'light' ? 'text-gray-900' : 'text-white'}>
              ₹{row.original.totalInvested.toLocaleString()}
            </span>
          </div>
        </div>
      )
    },
    {
      Header: 'Joined',
      accessor: 'createdAt',
      Cell: ({ value }) => (
        <div className="flex items-center gap-2">
          <Calendar className={`w-4 h-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`} />
          <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
            {new Date(value).toLocaleDateString()}
          </span>
        </div>
      )
    },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.status !== 'active' && (
            <button
              onClick={() => setUserToActivate(row.original.id)}
              className={`p-2 rounded-lg ${
                theme === 'light' 
                  ? 'hover:bg-gray-100 text-green-600' 
                  : 'hover:bg-gray-700 text-green-400'
              }`}
              title="Activate"
            >
              <UserCheck className="w-4 h-4" />
            </button>
          )}
          {row.original.status === 'active' && (
            <button
              onClick={() => setUserToDeactivate(row.original.id)}
              className={`p-2 rounded-lg ${
                theme === 'light' 
                  ? 'hover:bg-gray-100 text-yellow-600' 
                  : 'hover:bg-gray-700 text-yellow-400'
              }`}
              title="Deactivate"
            >
              <UserX className="w-4 h-4" />
            </button>
          )}
          {row.original.status !== 'banned' && (
            <button
              onClick={() => setUserToBan(row.original.id)}
              className={`p-2 rounded-lg ${
                theme === 'light' 
                  ? 'hover:bg-gray-100 text-red-600' 
                  : 'hover:bg-gray-700 text-red-400'
              }`}
              title="Ban"
            >
              <UserX className="w-4 h-4" />
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header with actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className={`text-2xl font-bold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Users
          </h1>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Manage user accounts and permissions
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            className={`p-2 rounded-lg ${
              theme === 'light' 
                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            className={`p-2 rounded-lg ${
              theme === 'light' 
                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
            theme === 'light' ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              theme === 'light'
                ? 'border-gray-300 focus:border-purple-500 bg-white text-gray-900'
                : 'border-gray-600 focus:border-purple-500 bg-gray-700 text-white'
            } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={`px-4 py-2 rounded-lg border ${
            theme === 'light'
              ? 'border-gray-300 focus:border-purple-500 bg-white text-gray-900'
              : 'border-gray-600 focus:border-purple-500 bg-gray-700 text-white'
          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="banned">Banned</option>
        </select>

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className={`px-4 py-2 rounded-lg border ${
            theme === 'light'
              ? 'border-gray-300 focus:border-purple-500 bg-white text-gray-900'
              : 'border-gray-600 focus:border-purple-500 bg-gray-700 text-white'
          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="flex-1 overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredUsers}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
        />
      </div>

      {/* Activate Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!userToActivate}
        title="Activate User"
        message="Are you sure you want to activate this user? They will regain full access to the platform."
        confirmLabel="Activate"
        confirmVariant="success"
        onConfirm={handleActivateConfirm}
        onCancel={() => setUserToActivate(null)}
      />

      {/* Deactivate Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!userToDeactivate}
        title="Deactivate User"
        message="Are you sure you want to deactivate this user? They will temporarily lose access to the platform."
        confirmLabel="Deactivate"
        confirmVariant="warning"
        onConfirm={handleDeactivateConfirm}
        onCancel={() => setUserToDeactivate(null)}
      />

      {/* Ban Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!userToBan}
        title="Ban User"
        message="Are you sure you want to ban this user? This will permanently restrict their access to the platform."
        confirmLabel="Ban User"
        confirmVariant="danger"
        onConfirm={handleBanConfirm}
        onCancel={() => setUserToBan(null)}
      />
    </div>
  );
};

export default UsersPanel;