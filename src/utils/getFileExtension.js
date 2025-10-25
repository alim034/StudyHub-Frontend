export default function getFileExtension(input) {
  if (!input) return '';
  if (input.includes('/')) {
    // MIME type
    const parts = input.split('/');
    return parts[1] ? parts[1].split(';')[0] : '';
  }
  // Filename
  const match = input.match(/\.([a-zA-Z0-9]+)$/);
  return match ? match[1].toLowerCase() : '';
}
