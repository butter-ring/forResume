import React from 'react';
import dateFns from 'date-fns';
import { Link } from 'react-router-dom';
// import { blue } from '@material-ui/core/colors';

const localeKor = require('date-fns/locale/ko');

class CoinScheduleComp extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
  };

  renderHeader() {
    // ㅁㅁㅁㅁ년 ㅁㅁ월 헤더 찍기
    const dateFormat = 'MMMM yyyy';

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span className="years">
            {dateFns.format(this.state.currentMonth, dateFormat, { localeKor })}
          </span>
        </div>
        <div className="col col-end">
          <div className="icon" onClick={this.nextMonth}>chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    // 요일 찍기
    const days = [];

    const daysofweek = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          className={
            i == 0
              ? 'col col-center-sunday'
              : i == 6
                ? 'col col-center-saturday'
                : 'col col-center'
          }
          key={i}
        >
          {/* <div className="col col-center-sunday" key={i}> */}
          {/* {dateFns.format(dateFns.addDays(startDate, i), dateFormat)} 이게 잘 안돼서 직접입력 */}
          {daysofweek[i]}
        </div>,
      );
    }
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    // 1~31일 날짜 찍기  , selectedDate = 오늘
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    const content = this.props.listNameFromParent;

    // day = 1~31일 연속 for문 ,  selectedDate = DB데이터.  둘이 같으면 출석체크
    function checkAttend(totaldays) {
      for (let j = 0; j < content.length; j++) {
        if (
          totaldays === content[j].createDate
          // dateFns.format(new Date(Number(content[j].createdAt)), 'yyyy-MM-dd')
        ) {
          // 1~31일 컨텐츠 넣는 부분
          return content[j].content;
        }
      }
      return false;
    }

    function checklink(totaldays) {
      for (let j = 0; j < content.length; j++) {
        if (
          totaldays === content[j].createDate
          // dateFns.format(new Date(Number(content[j].createdAt)), 'yyyy-MM-dd')
        ) {
          // 1~31일 컨텐츠 넣는 부분
          return content[j].contentnum;
        }
      }
      return false;
    }

    function weekendcolor(color) {
      if (color === 0) {
        return 'red';
      }
      if (color === 6) {
        return 'blue';
      }
      return '';
    }

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const totalday = dateFns.format(new Date(day), 'yyyy-MM-dd');
        days.push(
          // 1~31일 날짜 렌더링
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? 'disabled' // 같은달 일자가 아닐경우 날짜 회색효과 (전달, 다음달 날짜 회색)
                : '' // 일요일 , 토요일 일자 색깔
                  ? weekendcolor(i) // red
                  : weekendcolor(i) // blue
            }`}
            key={day}
            // onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <br />
            {/* <div className="coinmsg"> */}
            {/*  */}
            <Link
              to={`/board/detail/${
                !dateFns.isSameMonth(day, monthStart)
                ? '' // 같은달 일자가 아닐경우 날짜 회색효과 (전달, 다음달 날짜 회색)
                : checkAttend(totalday) // 함수 호출
                  ? checklink(totalday) // 함수 리턴값 받기
                  : ''}`}
            className="linkcss">
            <div
              className={`
              ${
  !dateFns.isSameMonth(day, monthStart)
    ? '' // 같은달 일자가 아닐경우 날짜 회색효과 (전달, 다음달 날짜 회색)
    : checkAttend(totalday) // 함수 호출
      ? 'coinmsg' // 함수 리턴값 받기
      : ''
}`}
            >
              <span>
                {!dateFns.isSameMonth(day, monthStart)
                  ? '' // 같은달 일자가 아닐경우 날짜 회색효과 (전달, 다음달 날짜 회색)
                  : checkAttend(totalday) // 함수 호출
                    ? checkAttend(totalday) // 함수 리턴값 받기
                    : ''}
              </span>
            </div>
              </Link>
          </div>,
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>,
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    console.log('click!!!');
    this.setState({
      selectedDate: day,
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1),
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1),
    });
  };

  render() {
    return (
      // <div style={{width=880}}>
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
      // </div>
    );
  }
}

export default CoinScheduleComp;
