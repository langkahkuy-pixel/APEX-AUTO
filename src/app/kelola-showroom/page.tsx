'use client';

import React, { Suspense } from 'react';
import AdminDashboardPage from '../admin/page';
import AdminRouteGuard from '@/components/AdminRouteGuard';

export default function KelolaShowroomPage() {
  return (
    <AdminRouteGuard>
      <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-xs">Memuat Panel Kelola Showroom...</div>}>
        <AdminDashboardPage />
      </Suspense>
    </AdminRouteGuard>
  );
}
