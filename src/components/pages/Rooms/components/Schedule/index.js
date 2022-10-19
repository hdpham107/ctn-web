import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Col, Row, Input, message } from 'antd'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

// import { getParam } from '../../../../util/helpers/functions';
// import * as bookingAction from '../../../../appRedux/actions/bookings/bookingActions'

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
)

class Schedule extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            start: '',
            end: '',
            visible: false,
            events: []
        }
    }

    componentDidMount() {
        // let books = this.props.dataSchedule;
        // let bookData = [];
        // for (let i = 0; i < books.length; i++) {
        //     const elm = books[i];
        //     if (elm.status === 0 || elm.status === 1) {
        //         let objBook = {
        //             title: elm.name + ' - ' + elm.nameTo,
        //             start: elm.start,
        //             end: elm.end
        //         }
        //         bookData.push(objBook);
        //     }
        // }
        this.setState({ events: [] })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        let { title, start, end } = this.state
        let timeSlot = {
            title: title,
            start: moment(start).format('YYYY-MM-DD HH:mm:ss'),
            end: moment(end).format('YYYY-MM-DD HH:mm:ss')
        }
        if (title === '') {
            message.warn('Bạn chưa nhập tên buổi học.')
        } else {
            this.props.addSchedule(timeSlot, (status) => {
                if (status) {
                    this.props.listBookings();
                }
            })
        }
        this.setState({ visible: false });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    modelAdd = () => {
        let { start, end, visible, title } = this.state
        let timeSlot = `${moment(start).format('hh:mm A')} => ${moment(end).format('hh:mm A')} - Ngày ${moment(end).format('DD-MM-YYYY')}`
        return (
            <Modal
                title={timeSlot}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <strong>Tên buổi học:</strong><br /><br />
                        <Input size="large" value={title}
                            onChange={(e) => {
                                this.setState({ title: e.target.value })
                            }}
                            placeholder="Buổi 1. giới thiệu khóa học"
                        />
                    </Col>
                </Row>
            </Modal>
        )
    }

    addSchedule = (slotInfo) => {
        this.setState({
            start: slotInfo.start,
            end: slotInfo.end,
            visible: true
        });
    }

    ScheduleTemplate = (events) => {
        return (
            <div className='gx-main-content'>
                <this.modelAdd />
                <div className='gx-rbc-calendar'>
                    <BigCalendar
                        messages={{
                            date: 'Ngày',
                            time: 'Thời gian',
                            event: 'Sựa Kiện',
                            allDay: 'Cả ngày',
                            week: 'tuần',
                            day: 'ngày',
                            month: 'tháng',
                            previous: 'trở lại',
                            next: 'tiếp theo',
                            yesterday: 'hôm qua',
                            tomorrow: 'Ngày mai',
                            today: 'Hôm nay',
                            agenda: 'nhật ký'
                        }}
                        style={{ height: '100%' }}
                        // selectable
                        events={events.length > 0 ? events : []}
                        defaultView='month'
                        scrollToTime={new Date(1970, 1, 1, 6)}
                        // defaultDate={new Date(2020, 6, 24)}
                        onSelectEvent={event => alert(event.title)}
                        onSelectSlot={this.addSchedule}
                    />
                </div>
            </div>
        )
    }

    render() {
        return (
            this.ScheduleTemplate(this.state.events)
        )
    }
}

const mapStateToProps = () => ({
})


const mapDispatchToProps = dispatch => ({
    // listBookings: dispatch(bookingAction.listBookings)
})
export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
