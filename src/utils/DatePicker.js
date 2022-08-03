import { DateRange } from 'react-date-range';


export default function DatePicker() {
    const handleSelect = (ranges) => {
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
    }
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }


    return (
      <div className="center tc pv3 ph2">
        <DateRange
        ranges={[selectionRange]}
        onChange={handleSelect}
        />
        </div>
    );
}
