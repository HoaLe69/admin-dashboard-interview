interface CardProps {
  className?: string
  children: React.ReactNode
}
export function Card({ className, children }: CardProps) {
  return (
    <div className={`${className} shadow-card h-full rounded-xl mt-6`}>
      <div className="shadow-card-wide">{children}</div>
    </div>
  )
}
