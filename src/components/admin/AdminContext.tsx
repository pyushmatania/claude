import React, { createContext, useContext, useState, ReactNode } from 'react';
import { extendedProjects } from '../../data/extendedProjects';
import { merchandise } from '../../data/merchandise';
import { perks } from '../../data/perks';

// Types for our data models
export interface Project {
  id: string;
  title: string;
  type: 'film' | 'music' | 'webseries';
  category: string;
  status: 'active' | 'pending' | 'completed' | 'archived';
  fundedPercentage: number;
  targetAmount: number;
  raisedAmount: number;
  createdAt: string;
  updatedAt: string;
  poster?: string;
  description?: string;
  director?: string;
  genre?: string;
  tags?: string[];
  perks?: string[];
  rating?: number;
  trailer?: string;
}

export interface MerchandiseItem {
  id: string;
  title: string;
  category: string;
  price: number;
  stockLevel: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  image?: string;
  createdAt: string;
}

export interface Perk {
  id: string;
  title: string;
  description: string;
  projectId?: string;
  projectTitle?: string;
  tier: 'supporter' | 'backer' | 'producer' | 'executive';
  minAmount: number;
  createdAt: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  fileSize: number;
  dimensions?: string;
  projectId?: string;
  tags: string[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'banned';
  investmentCount: number;
  totalInvested: number;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  userId?: string;
  userName?: string;
  resourceType: 'project' | 'merchandise' | 'perk' | 'media' | 'user' | 'system';
  resourceId?: string;
  details?: string;
  timestamp: string;
}

export interface BackupData {
  id: string;
  name: string;
  size: number;
  createdAt: string;
  status: 'completed' | 'in-progress' | 'failed';
}

// Context type
interface AdminContextType {
  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  archiveProject: (id: string) => void;
  
  // Merchandise
  merchandiseItems: MerchandiseItem[];
  addMerchandiseItem: (item: Omit<MerchandiseItem, 'id' | 'createdAt'>) => void;
  updateMerchandiseItem: (id: string, updates: Partial<MerchandiseItem>) => void;
  deleteMerchandiseItem: (id: string) => void;
  
  // Perks
  perks: Perk[];
  addPerk: (perk: Omit<Perk, 'id' | 'createdAt'>) => void;
  updatePerk: (id: string, updates: Partial<Perk>) => void;
  deletePerk: (id: string) => void;
  
  // Media
  mediaAssets: MediaAsset[];
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'createdAt'>) => void;
  updateMediaAsset: (id: string, updates: Partial<MediaAsset>) => void;
  deleteMediaAsset: (id: string) => void;
  
  // Users
  users: User[];
  updateUserStatus: (id: string, status: User['status']) => void;
  
  // Activity Log
  activityLogs: ActivityLog[];
  addActivityLog: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
  
  // Backups
  backups: BackupData[];
  createBackup: () => Promise<void>;
  restoreBackup: (id: string) => Promise<void>;
}

// Create context
const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Provider component
export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Use real project data
  const [projects, setProjects] = useState<Project[]>(extendedProjects);
  // TODO: When you add real data files for users, merchandise, perks, or media, import them here and use them as initial state.
  // Example:
  // import { users as realUsers } from '../../data/users';
  // const [users, setUsers] = useState<User[]>(realUsers);

  const [merchandiseItems, setMerchandiseItems] = useState<MerchandiseItem[]>(merchandise);

  const [perksState, setPerks] = useState<Perk[]>(perks);

  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([
    {
      id: '1',
      title: 'Pathaan 2 Official Poster',
      type: 'image',
      url: 'https://m.media-amazon.com/images/M/MV5BOGY4NWNlM2QtMzVjYy00OGY1LWI4N2UtZDNlYWE2ZThjYmRmXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_FMjpg_UX1000_.jpg',
      fileSize: 2048576, // 2MB
      dimensions: '1000x1500',
      projectId: '1',
      tags: ['poster', 'official', 'marketing'],
      createdAt: '2023-12-10T10:15:00Z'
    },
    {
      id: '2',
      title: 'A.R. Rahman Symphony Teaser',
      type: 'audio',
      url: 'https://example.com/audio/rahman-symphony-teaser.mp3',
      fileSize: 5242880, // 5MB
      projectId: '2',
      tags: ['audio', 'teaser', 'promotional'],
      createdAt: '2023-11-05T14:30:00Z'
    },
    {
      id: '3',
      title: 'Sacred Games 3 Trailer',
      type: 'video',
      url: 'https://example.com/videos/sacred-games-3-trailer.mp4',
      fileSize: 52428800, // 50MB
      dimensions: '1920x1080',
      projectId: '3',
      tags: ['trailer', 'promotional', 'netflix'],
      createdAt: '2024-01-03T16:45:00Z'
    },
    {
      id: '4',
      title: 'RRR 2 Concept Art',
      type: 'image',
      url: 'https://example.com/images/rrr-2-concept-art.jpg',
      fileSize: 3145728, // 3MB
      dimensions: '2000x1200',
      projectId: '4',
      tags: ['concept-art', 'pre-production'],
      createdAt: '2023-10-18T11:20:00Z'
    }
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Rahul Krishnan',
      email: 'rahul.investor@gmail.com',
      role: 'user',
      status: 'active',
      investmentCount: 12,
      totalInvested: 450000,
      createdAt: '2023-01-15T08:30:00Z'
    },
    {
      id: '2',
      name: 'Shreya Patel',
      email: 'shreya.patel@gmail.com',
      role: 'user',
      status: 'active',
      investmentCount: 8,
      totalInvested: 320000,
      createdAt: '2023-03-20T14:45:00Z'
    },
    {
      id: '3',
      name: 'Dev Malhotra',
      email: 'dev.malhotra@gmail.com',
      role: 'user',
      status: 'inactive',
      investmentCount: 5,
      totalInvested: 180000,
      createdAt: '2023-05-10T11:15:00Z'
    },
    {
      id: '4',
      name: 'Admin User',
      email: 'admin@circles.com',
      role: 'admin',
      status: 'active',
      investmentCount: 0,
      totalInvested: 0,
      createdAt: '2023-01-01T00:00:00Z'
    }
  ]);

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: '1',
      action: 'Project Created',
      userId: '4',
      userName: 'Admin User',
      resourceType: 'project',
      resourceId: '1',
      details: 'Created new project: Pathaan 2',
      timestamp: '2023-12-15T10:30:00Z'
    },
    {
      id: '2',
      action: 'User Login',
      userId: '4',
      userName: 'Admin User',
      resourceType: 'system',
      details: 'Admin user logged in',
      timestamp: '2024-01-30T09:15:00Z'
    },
    {
      id: '3',
      action: 'Merchandise Added',
      userId: '4',
      userName: 'Admin User',
      resourceType: 'merchandise',
      resourceId: '1',
      details: 'Added new merchandise: Pathaan 2 Limited Edition T-Shirt',
      timestamp: '2023-12-20T10:30:00Z'
    },
    {
      id: '4',
      action: 'Media Uploaded',
      userId: '4',
      userName: 'Admin User',
      resourceType: 'media',
      resourceId: '1',
      details: 'Uploaded new media: Pathaan 2 Official Poster',
      timestamp: '2023-12-10T10:15:00Z'
    },
    {
      id: '5',
      action: 'User Status Updated',
      userId: '4',
      userName: 'Admin User',
      resourceType: 'user',
      resourceId: '3',
      details: 'Updated user status to inactive: Dev Malhotra',
      timestamp: '2024-01-15T16:30:00Z'
    }
  ]);

  const [backups, setBackups] = useState<BackupData[]>([
    {
      id: '1',
      name: 'Full Backup - 2024-01-30',
      size: 15728640, // 15MB
      createdAt: '2024-01-30T00:00:00Z',
      status: 'completed'
    },
    {
      id: '2',
      name: 'Full Backup - 2024-01-23',
      size: 14680064, // 14MB
      createdAt: '2024-01-23T00:00:00Z',
      status: 'completed'
    },
    {
      id: '3',
      name: 'Full Backup - 2024-01-16',
      size: 13631488, // 13MB
      createdAt: '2024-01-16T00:00:00Z',
      status: 'completed'
    }
  ]);

  // Project functions
  const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now
    };
    
    setProjects(prev => [newProject, ...prev]);
    
    // Add activity log
    addActivityLog({
      action: 'Project Created',
      userId: '4',
      userName: 'Admin User',
      resourceType: 'project',
      resourceId: newProject.id,
      details: `Created new project: ${newProject.title}`
    });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id 
        ? { ...project, ...updates, updatedAt: new Date().toISOString() } 
        : project
    ));
    
    // Add activity log
    addActivityLog({
      action: 'Project Updated',
      userId: '4',
      userName: 'Admin User',
      resourceType: 'project',
      resourceId: id,
      details: `Updated project: ${updates.title || id}`
    });
  };

  const deleteProject = (id: string) => {
    const projectToDelete = projects.find(p => p.id === id);
    
    setProjects(prev => prev.filter(project => project.id !== id));
    
    // Add activity log
    if (projectToDelete) {
      addActivityLog({
        action: 'Project Deleted',
        userId: '4',
        userName: 'Admin User',
        resourceType: 'project',
        resourceId: id,
        details: `Deleted project: ${projectToDelete.title}`
      });
    }
  };

  const archiveProject = (id: string) => {
    setProjects(prev => prev.map(project => 
      project.id === id 
        ? { ...project, status: 'archived', updatedAt: new Date().toISOString() } 
        : project
    ));
    
    const projectToArchive = projects.find(p => p.id === id);
    
    // Add activity log
    if (projectToArchive) {
      addActivityLog({
        action: 'Project Archived',
        userId: '4',
        userName: 'Admin User',
        resourceType: 'project',
        resourceId: id,
        details: `Archived project: ${projectToArchive.title}`
      });
    }
  };

  // Merchandise functions
  const addMerchandiseItem = (item: Omit<MerchandiseItem, 'id' | 'createdAt'>) => {
    const newItem: MerchandiseItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    setMerchandiseItems(prev => [newItem, ...prev]);
    
    // Add activity log
    addActivityLog({
      action: 'Merchandise Added',
      userId: '4',
      userName: 'Admin User',
      resourceType: 'merchandise',
      resourceId: newItem.id,
      details: `Added new merchandise: ${newItem.title}`
    });
  };

  const updateMerchandiseItem = (id: string, updates: Partial<MerchandiseItem>) => {
    setMerchandiseItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
    
    // Add activity log
    addActivityLog({
      action: 'Merchandise Updated',
      userId: '4',
      userName: 'Admin User',
      resourceType: 'merchandise',
      resourceId: id,
      details: `Updated merchandise: ${updates.title || id}`
    });
  };

  const deleteMerchandiseItem = (id: string) => {
    const itemToDelete = merchandiseItems.find(m => m.id === id);
    
    setMerchandiseItems(prev => prev.filter(item => item.id !== id));
    
    // Add activity log
    if (itemToDelete) {
      addActivityLog({
        action: 'Merchandise Deleted',
        userId: '4',
        userName: 'Admin User',
        resourceType: 'merchandise',
        resourceId: id,
        details: `Deleted merchandise: ${itemToDelete.title}`
      });
    }
  };

  // Perks functions
  const addPerk = (perk: Omit<Perk, 'id' | 'createdAt'>) => {
    const newPerk: Perk = {
      ...perk,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    setPerks(prev => [newPerk, ...prev]);
    
    // Add activity log
    addActivityLog({
      action: 'Perk Added',
      userId: '4',
      userName: 'Admin User',
      resourceType: 'perk',
      resourceId: newPerk.id,
      details: `Added new perk: ${newPerk.title}`
    });
  };

  const updatePerk = (id: string, updates: Partial<Perk>) => {
    setPerks(prev => prev.map(perk => 
      perk.id === id ? { ...perk, ...updates } : perk
    ));
    
    // Add activity log
    addActivityLog({
      action: 'Perk Updated',
      userId: '4',
      userName: 'Admin User',
      resourceType: 'perk',
      resourceId: id,
      details: `Updated perk: ${updates.title || id}`
    });
  };

  const deletePerk = (id: string) => {
    const perkToDelete = perksState.find(p => p.id === id);
    
    setPerks(prev => prev.filter(perk => perk.id !== id));
    
    // Add activity log
    if (perkToDelete) {
      addActivityLog({
        action: 'Perk Deleted',
        userId: '4',
        userName: 'Admin User',
        resourceType: 'perk',
        resourceId: id,
        details: `Deleted perk: ${perkToDelete.title}`
      });
    }
  };

  // Media functions
  const addMediaAsset = (asset: Omit<MediaAsset, 'id' | 'createdAt'>) => {
    const newAsset: MediaAsset = {
      ...asset,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    setMediaAssets(prev => [newAsset, ...prev]);
    
    // Add activity log
    addActivityLog({
      action: 'Media Uploaded',
      userId: '4',
      userName: 'Admin User',
      resourceType: 'media',
      resourceId: newAsset.id,
      details: `Uploaded new media: ${newAsset.title}`
    });
  };

  const updateMediaAsset = (id: string, updates: Partial<MediaAsset>) => {
    setMediaAssets(prev => prev.map(asset => 
      asset.id === id ? { ...asset, ...updates } : asset
    ));
    
    // Add activity log
    addActivityLog({
      action: 'Media Updated',
      userId: '4',
      userName: 'Admin User',
      resourceType: 'media',
      resourceId: id,
      details: `Updated media: ${updates.title || id}`
    });
  };

  const deleteMediaAsset = (id: string) => {
    const assetToDelete = mediaAssets.find(m => m.id === id);
    
    setMediaAssets(prev => prev.filter(asset => asset.id !== id));
    
    // Add activity log
    if (assetToDelete) {
      addActivityLog({
        action: 'Media Deleted',
        userId: '4',
        userName: 'Admin User',
        resourceType: 'media',
        resourceId: id,
        details: `Deleted media: ${assetToDelete.title}`
      });
    }
  };

  // User functions
  const updateUserStatus = (id: string, status: User['status']) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, status } : user
    ));
    
    const userToUpdate = users.find(u => u.id === id);
    
    // Add activity log
    if (userToUpdate) {
      addActivityLog({
        action: 'User Status Updated',
        userId: '4',
        userName: 'Admin User',
        resourceType: 'user',
        resourceId: id,
        details: `Updated user status to ${status}: ${userToUpdate.name}`
      });
    }
  };

  // Activity log functions
  const addActivityLog = (log: Omit<ActivityLog, 'id' | 'timestamp'>) => {
    const newLog: ActivityLog = {
      ...log,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Backup functions
  const createBackup = async () => {
    // Simulate backup creation
    const newBackup: BackupData = {
      id: Date.now().toString(),
      name: `Full Backup - ${new Date().toISOString().split('T')[0]}`,
      size: Math.floor(Math.random() * 5000000) + 10000000, // Random size between 10-15MB
      createdAt: new Date().toISOString(),
      status: 'in-progress'
    };
    
    setBackups(prev => [newBackup, ...prev]);
    
    // Add activity log
    addActivityLog({
      action: 'Backup Started',
      userId: '4',
      userName: 'Admin User',
      resourceType: 'system',
      details: `Started new backup: ${newBackup.name}`
    });
    
    // Simulate backup completion after 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setBackups(prev => prev.map(backup => 
      backup.id === newBackup.id ? { ...backup, status: 'completed' } : backup
    ));
    
    // Add activity log
    addActivityLog({
      action: 'Backup Completed',
      userId: '4',
      userName: 'Admin User',
      resourceType: 'system',
      details: `Completed backup: ${newBackup.name}`
    });
  };

  const restoreBackup = async (id: string) => {
    const backupToRestore = backups.find(b => b.id === id);
    
    if (!backupToRestore) return;
    
    // Add activity log
    addActivityLog({
      action: 'Backup Restore Started',
      userId: '4',
      userName: 'Admin User',
      resourceType: 'system',
      details: `Started restoring backup: ${backupToRestore.name}`
    });
    
    // Simulate restore process
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Add activity log
    addActivityLog({
      action: 'Backup Restore Completed',
      userId: '4',
      userName: 'Admin User',
      resourceType: 'system',
      details: `Completed restoring backup: ${backupToRestore.name}`
    });
  };

  const value: AdminContextType = {
    projects,
    addProject,
    updateProject,
    deleteProject,
    archiveProject,
    
    merchandiseItems,
    addMerchandiseItem,
    updateMerchandiseItem,
    deleteMerchandiseItem,
    
    perks: perksState,
    addPerk,
    updatePerk,
    deletePerk,
    
    mediaAssets,
    addMediaAsset,
    updateMediaAsset,
    deleteMediaAsset,
    
    users,
    updateUserStatus,
    
    activityLogs,
    addActivityLog,
    
    backups,
    createBackup,
    restoreBackup
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use the admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};