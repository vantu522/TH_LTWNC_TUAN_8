export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p>© 2026 StudentHub. Dự án bài tập Lập trình Web Nâng Cao (Tuần 8).</p>
        <div className="flex gap-4">
          <span>Next.js 16 + React 19</span>
          <span>•</span>
          <span>NextAuth v5</span>
          <span>•</span>
          <span>Multi-layer Auth</span>
        </div>
      </div>
    </footer>
  );
}
