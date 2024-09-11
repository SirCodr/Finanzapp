import { useQuery } from "react-query";
import ListView from "../../components/list-view";
import { INCOMES_TABLE_COLUMNS } from "../../consts/config/incomes";
import { fetchAll } from "../../services/incomes";

function IncomesPage() {
  const { isLoading, data } = useQuery({
    queryFn: fetchAll
  })
  
  return (
    <ListView columns={INCOMES_TABLE_COLUMNS} items={data?.data} isLoading={isLoading} />
  )
}

export default IncomesPage;