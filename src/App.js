import { Component } from "react";
import { ADDREMINDER, CLEARREMINDER, REMOVEREMINDER } from "./Store/actions";
import { connect } from "react-redux";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from "./reminder2.png";
import "./App.css";

class App extends Component {
  state = {
    text: "",
    date: new Date(),
    // date: "",
  };

  handleAddReminder = (e) => {
    const { text, date } = this.state;
    if (!text || !date) {
      e.preventDefault();
      // console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeempty");
    } else {
      // Convert date to ISO format for consistency
      const formattedDate = moment(date).toISOString();
      if (!moment(formattedDate).isValid()) {
        console.log("Invalid date");
        return;
      }
      this.props.ADDREMINDER(text, formattedDate);

      // this.props.ADDREMINDER(text, date);
      // this.props.ADDREMINDER(text, moment(date).toISOString());
    }
  };

  render_reminders = () => {
    const { reminders } = this.props;
    return (
      <ul className="list-group">
        {reminders.map((reminder) => {
          // const formattedDate = moment(reminder.date, moment.ISO_8601).isValid()
          const formattedDate = moment(reminder.date).isValid()
            ? moment(reminder.date).fromNow()
            : "Invalid date";
          return (
            <li key={reminder.id} className="list-group-item">
              <div>{reminder.text}</div>
              {/* <div>{reminder.date}</div> */}
              {/* <div>{moment(new Date(reminder.date)).fromNow()}</div> */}
              {/* <div>{moment(reminder.date).fromNow()}</div> */}
              <div>{formattedDate}</div>
              <div
                className="closeIcon btn btn-danger"
                onClick={() => this.props.REMOVEREMINDER(reminder.id)}
              >
                X
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  render() {
    const placeholderText = moment().format("MMMM D, YYYY h:mm A");

    return (
      <div className="App">
        <img src={logo} alt="pic" />
        <div className="reminder-title">
          <h2>What Should U Do</h2>
        </div>

        <input
          className="form-control mb-2"
          type="text"
          placeholder="Enter What U Think..."
          value={this.state.text}
          onChange={(e) => this.setState({ text: e.target.value })}
        />

        {/* <input
          className="form-control"
          type="datetime-local"
          value={this.state.date}
          onChange={(e) => this.setState({ date: e.target.value })}
        /> */}

        <DatePicker
          className="form-control mb-2"
          value={this.state.date}
          placeholderText="Select a date"
          // placeholderText={placeholderText}
          selected={this.state.date}
          onChange={(date) => {
            this.setState({ date: date });
          }}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeCaption="time"
        />

        {console.log(this.state)}
        <div className="d-grid gap-2 btnContainer">
          <button
            className="btn btn-primary "
            // onClick={() =>
            //   this.props.ADDREMINDER(this.state.text, this.state.date)
            // }
            onClick={(e) => {
              this.handleAddReminder(e);
              this.setState({ text: "", date: "" });
            }}
          >
            ADD Reminder
          </button>

          {/* {this.props.reminders !== undefined && this.render_reminders()} */}
          {this.props.reminders && this.render_reminders()}
          <button
            className="ClearReminder btn btn-danger "
            onClick={() => this.props.CLEARREMINDER()}
          >
            CLEAR Reminders
          </button>

          {/* {this.props.reminders !== undefined && (
            <ul>
              {this.props.reminders.map((reminder, index) => (
                <li key={index}>
                  {reminder.text} - {reminder.date}
                </li>
              ))}
            </ul>
          )} */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reminders: state,
  };
}

function mapDispatchToProps(Dispatch) {
  return {
    ADDREMINDER: (text, date) => {
      Dispatch(ADDREMINDER(text, date));
    },
    REMOVEREMINDER: (id) => {
      Dispatch(REMOVEREMINDER(id));
    },
    CLEARREMINDER: () => {
      Dispatch(CLEARREMINDER());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default connect(null, {ADDREMINDER})(App);
// export default connect(mapStateToProps, {ADDREMINDER})(App);
