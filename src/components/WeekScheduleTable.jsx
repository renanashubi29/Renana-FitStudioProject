import { ScheduleCardComp } from "./ScheduleCardComp";



export const WeekScheduleTable=() =>{
  return (
    <table className="schedule-table">
      <thead>
        <tr>
          <th>יום</th>
          <th>אימונים</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td className="day">ראשון</td>
          <td>
            <ScheduleCardComp />
          </td>
        </tr>

        <tr>
          <td className="day">שני</td>
          <td>
            <ScheduleCardComp />
          </td>
        </tr>

        <tr>
          <td className="day">שלישי</td>
          <td></td>
        </tr>

        <tr>
          <td className="day">רביעי</td>
          <td>
            <ScheduleCardComp />
          </td>
        </tr>

        <tr>
          <td className="day">חמישי</td>
          <td>
            <ScheduleCardComp />
           
          </td>
        </tr>

        <tr>
          <td className="day">שישי</td>
          <td>
            <ScheduleCardComp />
          </td>
        </tr>

        <tr>
          <td className="day">שבת</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}
