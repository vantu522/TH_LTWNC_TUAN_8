import type { Metadata } from "next";
import { MOCK_POSTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Danh Sách Bài Viết",
  description:
    "Khám phá các bài viết, tin tức và tài liệu học tập bổ ích dành cho sinh viên tại StudentHub.",
  alternates: {
    canonical: "/posts",
  },
  openGraph: {
    title: "Danh Sách Bài Viết | StudentHub",
    description: "Khám phá các bài viết và tài liệu học tập bổ ích.",
    images: ["/opengraph-image.png"],
    type: "website",
  },
};

export default function PostsPage() {
  // Cấu trúc Schema JSON-LD cho danh sách bài viết chuẩn SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: MOCK_POSTS.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Article",
        name: post.title,
        description: post.description,
        datePublished: post.publishedAt,
      },
    })),
  };

  return (
    <div className="space-y-6">
      {/* Script chèn JSON-LD chuẩn SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="border-b border-gray-200 pb-5">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          Trang Công Khai
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
          Bài Viết Dành Cho Sinh Viên
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Tập hợp các tài liệu học tập, kỹ năng và kiến thức chuyên ngành.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_POSTS.map((post) => (
          <article
            key={post.id}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium">
                  {post.category}
                </span>
                <time dateTime={post.publishedAt}>{post.publishedAt}</time>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mt-2 hover:text-blue-600 cursor-pointer transition">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                {post.description}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>Bởi StudentHub Team</span>
              <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                Đọc tiếp →
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
