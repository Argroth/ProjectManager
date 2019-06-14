import React, {Component} from 'react';
import { connect } from "react-redux";
import { fetchCalendar, selectDate } from "../actions";
import EditDate from './calendar-day-edit';


class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state={
            calendarToShow: '123'
        };
    };

    componentDidMount() {
        this.props.getCalendar();
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.message === 'Record updated successfully'){
            window.location='/admin-panel/calendar';
        }
    };

    filterTable = (option) => {
        switch(option){
            case 'freeDays':{
                let isFreeDay = (value) => {
                    return value.offWork === true && value.description !== 'Weekend'
                };
                console.log(this.props.calendar.filter(isFreeDay));
                break;
            }
            case '2019':{
                console.log('2019');
                let is2019 = (value) => {
                    return value.day.startsWith('2019');
                };
                //this.setState({calendarToShow: this.props.calendar.filter(is2019)});
                console.log(this.props.calendar.filter(is2019));
                break;
            }
            case '2020':{
                console.log('2020');
                let is2020 = (value) => {
                    return value.day.startsWith('2020');
                };
                //this.setState({calendarToShow: this.props.calendar.filter(is2020)});
                console.log(this.props.calendar.filter(is2020));
                break;
            }
            default:
                console.log('err');
        }
    };


    renderTable(){
      return(
          <div>
              <button onClick={() => this.filterTable('freeDays')}>Free Days</button>
              <button onClick={() => this.filterTable('2019')}>2019</button>
              <button onClick={() => this.filterTable('2020')}>2020</button>
              {this.props.daySelected.length === 0? '' : <EditDate />}
              <table>
                  <thead>
                    <tr>
                        <td>Date</td>
                        <td>Name</td>
                        <td>Day off</td>
                        <td>Description</td>
                    </tr>
                  </thead>
                  <tbody>

                        {this.props.calendar === undefined ? <tr><td>Loading...</td><td>Loading...</td><td>Loading...</td><td>Loading...</td></tr> : this.props.calendar.map( day => {
                            return(
                                    <tr onClick={() => {this.props.selectDate(day)}} key={day._id}>
                                        <td>{day.day}</td>
                                        <td>{day.name}</td>
                                        <td><input type="checkbox" checked={day.offWork} disabled/></td>
                                        <td>{day.description}</td>
                                    </tr>
                            )
                        })}

                  </tbody>
              </table>
          </div>
      )
    };



    render() {
        return (
            <div>
                {this.renderTable()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
        return ({
            calendar: state.calendar.data,
            daySelected: state.selectedDay,
            message: state.updateDate.data
        });
};

const mapDispatchToProps = (dispatch) => ({
    getCalendar: () => dispatch(fetchCalendar()),
    selectDate: (date) => dispatch(selectDate(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);