'use client';

import React from 'react';
import { AdminRouteGuard } from '@/components/AdminRouteGuard';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === '/admin/login') return <>{children}</>;
  return <AdminRouteGuard key={pathname}>{children}</AdminRouteGuard>;
}
