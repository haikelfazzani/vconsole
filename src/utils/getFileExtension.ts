export default function getFileExtension(filename:string) {
  const parts = filename.split('.');
  return parts.pop();
}