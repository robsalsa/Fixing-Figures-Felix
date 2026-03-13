import { ReactNode, Suspense } from 'react';

type GuildRouterLayoutProps = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export default function GuildRouterLayout({ children }: GuildRouterLayoutProps) {
  return <Suspense>{children}</Suspense>;
}
