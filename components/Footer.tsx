export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8 text-sm text-gray-600 flex items-center justify-between">
        <p>? {new Date().getFullYear()} Clothify. All rights reserved.</p>
        <p className="text-gray-500">Built with Next.js & Tailwind CSS</p>
      </div>
    </footer>
  );
}
