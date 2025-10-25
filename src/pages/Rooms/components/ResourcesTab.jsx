import React, { useState, useEffect } from 'react';
import { getResources, uploadResources, uploadNewVersion, deleteResource } from '../../../api/resourcesApi';
import Spinner from "../../../components/common/Spinner";
import { useToast } from "../../../components/common/Toast";
import FileTypeBadge from '../../../components/common/FileTypeBadge';
import getFileExtension from '../../../utils/getFileExtension';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ResourcesTab = ({ roomId, currentUser }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const toast = useToast();

  const fetchResources = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (tags) params.tags = tags;
      const res = await getResources(roomId, params);
      setResources(res.data.resources);
    } catch {
      toast.show('Failed to load resources', 'error');
    }
    setLoading(false);
  };

  useEffect(() => { fetchResources(); }, [search, tags, roomId]);

  const handleUpload = async () => {
    if (!selectedFiles.length) return;
    setLoading(true);
    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('files', file));
    if (tags) formData.append('tags', tags);
    try {
      await uploadResources(roomId, formData);
      toast.show('Files uploaded', 'success');
      setShowModal(false);
      fetchResources();
    } catch {
      toast.show('Upload failed', 'error');
    }
    setLoading(false);
  };

  const handleDelete = async (resource) => {
    setLoading(true);
    try {
      await deleteResource(roomId, resource._id);
      toast.show('Resource deleted', 'success');
      fetchResources();
    } catch {
      toast.show('Delete failed', 'error');
    }
    setLoading(false);
  };

  // Preview logic
  const handlePreview = (resource) => {
    setSelectedResource(resource);
    setPreviewOpen(true);
    setPageNumber(1);
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setSelectedResource(null);
    setNumPages(null);
    setPageNumber(1);
  };

  const renderPreview = () => {
    if (!selectedResource) return null;
    const ext = getFileExtension(selectedResource.name || selectedResource.type);
    if (ext === 'pdf') {
      return (
        <div className="flex flex-col items-center">
          <Document
            file={selectedResource.url}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            className="w-full"
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>
          <div className="flex items-center mt-2">
            <button
              className="btn btn-xs mr-2"
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              Prev
            </button>
            <span>
              Page {pageNumber} of {numPages}
            </span>
            <button
              className="btn btn-xs ml-2"
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Next
            </button>
          </div>
        </div>
      );
    }
    if (['jpg', 'jpeg', 'png'].includes(ext)) {
      return (
        <img
          src={selectedResource.url}
          alt={selectedResource.name}
          className="max-w-full max-h-[70vh] rounded shadow"
        />
      );
    }
    // Other file types
    return (
      <div className="flex flex-col items-center">
        <FileTypeBadge fileType={selectedResource.type} filename={selectedResource.name} />
        <span className="mb-2">{selectedResource.name}</span>
        <a
          href={selectedResource.url}
          download
          className="btn btn-primary"
        >
          Download File
        </a>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="border p-2 mr-2"
        />
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Upload</button>
      </div>
      {loading && <Spinner />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map(resource => (
          <div key={resource._id} className="border p-4 rounded shadow cursor-pointer hover:bg-gray-50" onClick={() => handlePreview(resource)}>
            <div className="flex items-center mb-2">
              <FileTypeBadge fileType={resource.type} filename={resource.name} />
              <span className="font-bold">{resource.name}</span>
            </div>
            <div>Uploader: {resource.uploader?.name || 'Unknown'}</div>
            <div>Version: {resource.version}</div>
            <div>
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">Download</a>
            </div>
            {(resource.uploader?._id === currentUser._id /* or isAdmin */) && (
              <div className="flex mt-2">
                <button className="btn btn-danger" onClick={e => { e.stopPropagation(); handleDelete(resource); }}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Upload Files</h2>
            <input type="file" multiple onChange={e => setSelectedFiles([...e.target.files])} />
            <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
            <button onClick={handleUpload}>Upload</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {previewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 btn btn-sm btn-error"
              onClick={closePreview}
            >
              Close
            </button>
            {renderPreview()}
          </div>
        </div>
      )}
  {/* Toasts are now handled globally by ToastProvider */}
    </div>
  );
};

export default ResourcesTab;