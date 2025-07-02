import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Filter, 
  Search, 
  Edit, 
  Trash2, 
  Archive, 
  MoreVertical,
  Film,
  Music,
  Tv,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from 'lucide-react';
import { useTheme } from '../../ThemeProvider';
import { useAdmin, Project } from '../AdminContext';
import ProjectForm from '../forms/ProjectForm';
import ConfirmDialog from '../shared/ConfirmDialog';
import DataTable from '../shared/DataTable';
import { Column } from 'react-table';

const ProjectsPanel: React.FC = () => {
  const { theme } = useTheme();
  const { projects, deleteProject, archiveProject } = useAdmin();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [projectToArchive, setProjectToArchive] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Define valid sort fields for type safety
  const validSortFields: (keyof Project)[] = [
    'createdAt', 'updatedAt', 'title', 'type', 'category', 'status', 'fundedPercentage', 'targetAmount', 'raisedAmount'
  ];

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter(project => {
        // Search term filter
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Type filter
        const matchesType = filterType === 'all' || project.type === filterType;
        
        // Status filter
        const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
        
        // Category filter
        const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
        
        return matchesSearch && matchesType && matchesStatus && matchesCategory;
      })
      .sort((a, b) => {
        if (validSortFields.includes(sortField as keyof Project)) {
          const key = sortField as keyof Project;
          // Handle date fields
          if (key === 'createdAt' || key === 'updatedAt') {
            return sortDirection === 'asc'
              ? new Date(a[key] as string).getTime() - new Date(b[key] as string).getTime()
              : new Date(b[key] as string).getTime() - new Date(a[key] as string).getTime();
          }
          // Handle numeric fields
          if (typeof a[key] === 'number' && typeof b[key] === 'number') {
            return sortDirection === 'asc'
              ? (a[key] as number) - (b[key] as number)
              : (b[key] as number) - (a[key] as number);
          }
          // Handle string fields
          return sortDirection === 'asc'
            ? String(a[key]).localeCompare(String(b[key]))
            : String(b[key]).localeCompare(String(a[key]));
        }
        // If not a valid key, do not sort
        return 0;
      });
  }, [projects, searchTerm, filterType, filterStatus, filterCategory, sortField, sortDirection]);

  // Get unique categories for filter
  const categories = useMemo(() => {
    const uniqueCategories = new Set(projects.map(project => project.category));
    return Array.from(uniqueCategories);
  }, [projects]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDeleteConfirm = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete);
      setProjectToDelete(null);
    }
  };

  const handleArchiveConfirm = () => {
    if (projectToArchive) {
      archiveProject(projectToArchive);
      setProjectToArchive(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'archived':
        return <Archive className="w-4 h-4 text-gray-500" />;
      default:
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'film':
        return <Film className="w-4 h-4 text-purple-500" />;
      case 'music':
        return <Music className="w-4 h-4 text-blue-500" />;
      case 'webseries':
        return <Tv className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const columns: Column<Project>[] = [
    {
      Header: 'Title',
      accessor: 'title',
      Cell: ({ row }) => (
        <div className="flex items-center gap-3">
          {row.original.poster ? (
            <img 
              src={row.original.poster} 
              alt={row.original.title}
              className="w-10 h-10 object-cover rounded"
            />
          ) : (
            <div className={`w-10 h-10 rounded flex items-center justify-center ${
              theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
            }`}>
              {getTypeIcon(row.original.type)}
            </div>
          )}
          <div>
            <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              {row.original.title}
            </p>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                {row.original.category}
              </span>
              <span className="flex items-center gap-1 text-xs">
                {getTypeIcon(row.original.type)}
                <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
                  {row.original.type}
                </span>
              </span>
            </div>
          </div>
        </div>
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
            value === 'pending' ? 'text-yellow-500' :
            value === 'completed' ? 'text-blue-500' :
            'text-gray-500'
          }`}>
            {value}
          </span>
        </div>
      )
    },
    {
      Header: 'Funding',
      accessor: 'fundedPercentage',
      Cell: ({ row }) => (
        <div>
          <span className="font-semibold">
            {row.original.fundedPercentage}%
          </span>
          <span className="ml-2 text-xs text-gray-400">
            of ₹{row.original.targetAmount.toLocaleString()}
          </span>
        </div>
      )
    },
    {
      Header: 'Created',
      accessor: 'createdAt',
      Cell: ({ value }) => (
        <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
          {new Date(value).toLocaleDateString()}
        </span>
      )
    },
    {
      Header: 'Updated',
      accessor: 'updatedAt',
      Cell: ({ value }) => (
        <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
          {new Date(value).toLocaleDateString()}
        </span>
      )
    },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditingProject(row.original)}
            className={`p-2 rounded-lg ${
              theme === 'light' 
                ? 'hover:bg-gray-100 text-gray-600' 
                : 'hover:bg-gray-700 text-gray-300'
            }`}
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => setProjectToArchive(row.original.id)}
            className={`p-2 rounded-lg ${
              theme === 'light' 
                ? 'hover:bg-gray-100 text-gray-600' 
                : 'hover:bg-gray-700 text-gray-300'
            }`}
            title="Archive"
          >
            <Archive className="w-4 h-4" />
          </button>
          <button
            onClick={() => setProjectToDelete(row.original.id)}
            className={`p-2 rounded-lg ${
              theme === 'light' 
                ? 'hover:bg-gray-100 text-red-600' 
                : 'hover:bg-gray-700 text-red-400'
            }`}
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
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
            Projects
          </h1>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Manage all your entertainment projects
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </button>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
            theme === 'light' ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            placeholder="Search projects..."
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
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className={`px-4 py-2 rounded-lg border ${
            theme === 'light'
              ? 'border-gray-300 focus:border-purple-500 bg-white text-gray-900'
              : 'border-gray-600 focus:border-purple-500 bg-gray-700 text-white'
          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
        >
          <option value="all">All Types</option>
          <option value="film">Films</option>
          <option value="music">Music</option>
          <option value="webseries">Web Series</option>
        </select>

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
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="archived">Archived</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className={`px-4 py-2 rounded-lg border ${
            theme === 'light'
              ? 'border-gray-300 focus:border-purple-500 bg-white text-gray-900'
              : 'border-gray-600 focus:border-purple-500 bg-gray-700 text-white'
          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Projects Table */}
      <div className="flex-1 overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredProjects}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
        />
      </div>

      {/* Add/Edit Project Modal */}
      {(isAddModalOpen || editingProject) && (
        <ProjectForm
          project={editingProject}
          isOpen={isAddModalOpen || !!editingProject}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingProject(null);
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!projectToDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmLabel="Delete"
        confirmVariant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setProjectToDelete(null)}
      />

      {/* Archive Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!projectToArchive}
        title="Archive Project"
        message="Are you sure you want to archive this project? It will no longer be visible to users but can be restored later."
        confirmLabel="Archive"
        confirmVariant="warning"
        onConfirm={handleArchiveConfirm}
        onCancel={() => setProjectToArchive(null)}
      />
    </div>
  );
};

export default ProjectsPanel;