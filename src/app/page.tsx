import Container from "@/components/layout/container"
import Header from "@/components/layout/header"
import ProductionPlanSection from "@/components/production-plan-section"
import ProductionStatusSection from "@/components/production-status-section"
import TopCustomersSection from "@/components/top-customers-section"
import TopProductSection from "@/components/top-products-section"
import ProductionProgressSection from "@/components/production-progress-section"
import MaterialsNeededTable from "@/components/materials-needed-table"

export default function Home() {
  return (
    <div>
      <Header />
      <Container>
        <TopProductSection />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          <ProductionPlanSection />
          <TopCustomersSection />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 pb-10">
          <ProductionStatusSection />
          <ProductionProgressSection />
          <MaterialsNeededTable />
        </div>
      </Container>
    </div>
  )
}
