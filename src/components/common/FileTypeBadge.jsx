import React from 'react';
import { FaFilePdf, FaFileImage, FaFileWord, FaFileArchive, FaFileAlt } from 'react-icons/fa';
import getFileExtension from '../../utils/getFileExtension';

const typeMap = {
  'pdf': { color: 'bg-red-500', icon: <FaFilePdf />, label: 'PDF' },
  'jpg': { color: 'bg-blue-500', icon: <FaFileImage />, label: 'JPG' },
  'jpeg': { color: 'bg-blue-500', icon: <FaFileImage />, label: 'JPEG' },
  'png': { color: 'bg-blue-400', icon: <FaFileImage />, label: 'PNG' },
  'doc': { color: 'bg-blue-700', icon: <FaFileWord />, label: 'DOC' },
  'docx': { color: 'bg-blue-700', icon: <FaFileWord />, label: 'DOCX' },
  'zip': { color: 'bg-yellow-500', icon: <FaFileArchive />, label: 'ZIP' },
  'rar': { color: 'bg-yellow-500', icon: <FaFileArchive />, label: 'RAR' },
};

export default function FileTypeBadge({ fileType, filename }) {
  const ext = getFileExtension(filename || fileType);
  const type = typeMap[ext] || { color: 'bg-gray-400', icon: <FaFileAlt />, label: ext ? ext.toUpperCase() : 'FILE' };
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold text-white ${type.color} mr-2`}>
      {type.icon}
      <span className="ml-1">{type.label}</span>
    </span>
  );
}
