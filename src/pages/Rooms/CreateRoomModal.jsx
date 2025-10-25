import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Lock, Globe, Tag } from 'lucide-react';

const CreateRoomModal = ({ onClose, onCreateRoom }) => {
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        description: '',
        isPrivate: false,
        maxMembers: 50,
        tags: []
    });
    const [newTag, setNewTag] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name.trim() && formData.subject.trim()) {
            onCreateRoom(formData);
        }
    };

    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Create Study Room</h2>
                    <button
                        onClick={onClose}
                        className="text-white/60 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                            Room Name *
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                            placeholder="Enter room name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                            Subject *
                        </label>
                        <input
                            type="text"
                            value={formData.subject}
                            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                            placeholder="e.g., Mathematics, Programming"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                            placeholder="Describe your study room"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                            Tags
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                                placeholder="Add tag"
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                            />
                            <button
                                type="button"
                                onClick={addTag}
                                className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                            >
                                <Tag className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-full flex items-center gap-1"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="text-white/60 hover:text-white"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-white/80">
                            <input
                                type="checkbox"
                                checked={formData.isPrivate}
                                onChange={(e) => setFormData(prev => ({ ...prev, isPrivate: e.target.checked }))}
                                className="rounded"
                            />
                            {formData.isPrivate ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                            Private Room
                        </label>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-all"
                        >
                            Create Room
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default CreateRoomModal;