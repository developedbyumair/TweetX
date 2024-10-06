interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}
