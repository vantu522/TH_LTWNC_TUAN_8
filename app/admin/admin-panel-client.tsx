"use client";

import { useState, useTransition } from "react";
import { deleteUserAction, updateUserRoleAction, ActionResult } from "@/app/actions/admin-actions";
import type { MockUser } from "@/lib/constants";

interface AdminPanelClientProps {
  initialUsers: MockUser[];
}

export default function AdminPanelClient({ initialUsers }: AdminPanelClientProps) {
  const [users, setUsers] = useState<MockUser[]>(initialUsers);
  const [result, setResult] = useState<ActionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete(userId: string) {
    setResult(null);
    startTransition(async () => {
      const res = await deleteUserAction(userId);
      setResult(res);
      if (res.success) {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
      }
    });
  }

  function handleRoleToggle(userId: string, currentRole: "admin" | "user") {
    setResult(null);
    const nextRole = currentRole === "admin" ? "user" : "admin";
    startTransition(async () => {
      const res = await updateUserRoleAction(userId, nextRole);
      setResult(res);
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: nextRole } : u))
        );
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Thông báo kết quả từ Server Action */}
      {result && (
        <div
          className={`p-4 rounded-xl border text-sm flex items-start gap-3 transition ${
            result.success
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <span className="text-lg">{result.success ? "✅" : "❌"}</span>
          <div>
            <p className="font-bold">
              {result.success ? "Thao tác thành công:" : "Từ chối truy cập (403):"}
            </p>
            <p>{result.message || result.error}</p>
          </div>
        </div>
      )}

      {/* Bảng quản lý người dùng */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">
            Danh Sách Tài Khoản Trong Hệ Thống
          </h2>
          <span className="text-xs text-gray-500">
            {users.length} tài khoản
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Họ và Tên</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Vai Trò</th>
                <th className="px-6 py-3 text-right">Thao Tác (Server Action)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700 border border-purple-200"
                          : "bg-green-100 text-green-700 border border-green-200"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      disabled={isPending}
                      onClick={() => handleRoleToggle(user.id, user.role)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 disabled:opacity-50 transition"
                    >
                      Đổi Quyền
                    </button>
                    <button
                      disabled={isPending}
                      onClick={() => handleDelete(user.id)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 disabled:opacity-50 transition font-medium"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
