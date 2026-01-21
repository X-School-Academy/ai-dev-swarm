'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Lightbulb,
  Layers,
  FolderKanban,
  GitBranch,
  Bot,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/ideas', label: 'Ideas', icon: Lightbulb },
  { href: '/stages', label: 'Stages', icon: Layers },
  { href: '/sprints', label: 'Sprints', icon: FolderKanban },
  { href: '/git', label: 'Git', icon: GitBranch },
  { href: '/agents', label: 'Agents', icon: Bot },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">AI Dev Swarm</h1>
        <p className="text-xs text-gray-400 mt-1">WebUI</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition',
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  )}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800 text-xs text-gray-500">
        <p>Backend: localhost:8001</p>
      </div>
    </aside>
  );
}
