import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Mail, Phone, Trash2, Edit } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const TeamManagement = () => {
  const { theme } = useTheme();
  const [team, setTeam] = useState([
    { id: 1, name: 'John Doe', role: 'Financial Analyst', email: 'john@example.com', phone: '(555) 123-4567' },
    { id: 2, name: 'Jane Smith', role: 'Accountant', email: 'jane@example.com', phone: '(555) 987-6543' },
    { id: 3, name: 'Mike Johnson', role: 'Budget Manager', email: 'mike@example.com', phone: '(555) 456-7890' },
  ]);

  const [showAddMember, setShowAddMember] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const addTeamMember = (newMember) => {
    setTeam([...team, { id: team.length + 1, ...newMember }]);
    setShowAddMember(false);
  };

  const updateTeamMember = (updatedMember) => {
    setTeam(team.map(member => member.id === updatedMember.id ? updatedMember : member));
    setEditingMember(null);
  };

  const deleteTeamMember = (id) => {
    setTeam(team.filter(member => member.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
    >
      <h2 className="text-3xl font-bold mb-6">Team Management</h2>
      <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} p-6 rounded-lg shadow-lg`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Finance Team</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center px-4 py-2 rounded ${
              theme === 'dark'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            onClick={() => setShowAddMember(true)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Team Member
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onEdit={() => setEditingMember(member)}
              onDelete={() => deleteTeamMember(member.id)}
            />
          ))}
        </div>
        {showAddMember && (
          <AddEditTeamMemberForm
            onSubmit={addTeamMember}
            onCancel={() => setShowAddMember(false)}
          />
        )}
        {editingMember && (
          <AddEditTeamMemberForm
            member={editingMember}
            onSubmit={updateTeamMember}
            onCancel={() => setEditingMember(null)}
          />
        )}
      </div>
    </motion.div>
  );
};

const TeamMemberCard = ({ member, onEdit, onDelete }) => {
  const { theme } = useTheme();
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}
    >
      <div className="flex items-center mb-2">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-100'}`}>
          <Users className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-blue-600'}`} />
        </div>
        <div>
          <h4 className="text-lg font-semibold">{member.name}</h4>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{member.role}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <p className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          <Mail className="w-4 h-4 mr-2" />
          {member.email}
        </p>
        <p className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          <Phone className="w-4 h-4 mr-2" />
          {member.phone}
        </p>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onEdit}
          className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          <Edit className="w-4 h-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onDelete}
          className={`p-2 rounded ${theme === 'dark' ? 'bg-red-600 hover:bg-red-500' : 'bg-red-200 hover:bg-red-300'}`}
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const AddEditTeamMemberForm = ({ member, onSubmit, onCancel }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState(member || { name: '', role: '', email: '', phone: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
    >
      <h4 className="text-lg font-semibold mb-4">{member ? 'Edit' : 'Add'} Team Member</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`}
          required
        />
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role"
          className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`}
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`}
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`}
          required
        />
        <div className="flex justify-end space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={onCancel}
            className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-900'}`}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}
          >
            {member ? 'Update' : 'Add'} Member
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default TeamManagement;