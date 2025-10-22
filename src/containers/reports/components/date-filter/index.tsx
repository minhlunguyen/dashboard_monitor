import DateTab from './DateTab'
import { usePageContext } from '../../context'

const index = () => {
  const { setDateSelected, setTypeDate, setValueDate, typeDate, valueDate } = usePageContext()
  return (
    <div>
      <DateTab
        typeDate={typeDate}
        setTypeDate={setTypeDate}
        setDateSelected={setDateSelected}
        valueDate={valueDate}
        setValueDate={setValueDate}
      />
    </div>
  )
}

export default index
