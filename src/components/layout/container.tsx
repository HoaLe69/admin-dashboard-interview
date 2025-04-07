interface Props {
  children: React.ReactNode
}

export default function Container({ children }: Props) {
  return <div className="w-screen lg:px-12 px-4">{children}</div>
}
