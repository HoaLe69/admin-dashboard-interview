interface HeadingChartSectionProps {
  title: string
}
export function HeadingChartSection({ title }: HeadingChartSectionProps) {
  return <h2 className="font-medium text-base lg:text-[18px] text-neutral-07 lg:leading-10">{title}</h2>
}
