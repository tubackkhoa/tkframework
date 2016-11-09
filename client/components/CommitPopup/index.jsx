import React, { PropTypes } from 'react'
import {RaisedButton, Checkbox} from 'material-ui'
import DayCommitBar from 'components/DayCommitBar'


const styles = {
    checkbox: {
        marginBottom: 16,
    },
    button: {
        margin: "0 auto",
        // float: 'right',
        display: 'block',
        width: "120px",
    },
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
    Dialog: {
      title: {
        color: "rgb(94, 163, 255)",
        fontSize: 36,
        textAlign: "center",
        fontWeight: 300
      },
      linearProgress: {
        textAlign: "center",
        position: "relative",
        height: 15,
        display: "block",
        width: 400,
        backgroundColor: "rgb(239, 242, 249)",
        borderRadius: 7,
        margin: "10px auto",
        overflow: "hidden",
      },
      exercise: {
        clear: "both",
        textAlign: "center",
        marginTop: 20
      }
    }
}

class CommitPopup extends React.Component{
    render(){
        return(
        <div className="popup_block">
            <div className="popup_window">
                <div className="headingText">Cam kết học tốt</div>
                <p>Vui lòng lựa chọn các cam kết sau</p>
                <div className="mt-5">
                    <div style={styles.block}>
                        <Checkbox
                            label="Check1"
                            style={styles.checkbox}
                        />
                        <Checkbox
                            label="Check2"
                            style={styles.checkbox}
                        />
                        <Checkbox
                            label="Check3"
                            style={styles.checkbox}
                        />
                    </div>

                </div>
                <p>Nhập cam kết riêng của bạn</p>
                <textarea rows="5" cols="50"></textarea>
                <p>Lịch học của bạn</p>
                    <div className="time-schedule">
                    <div className="time">
                        <p>Giờ học hằng ngày</p>
                    </div>
                    <div className="duration">
                        <p>Thời lượng học tối thiểu</p>
                    </div>
                    <div className="day"><DayCommitBar></DayCommitBar></div>

                </div>
                <div className="learn-now">
                    <RaisedButton
                        className="button primary mr-10 mt-20"
                        label="Học ngay"
                        href="/tongquan"
                        primary={true}
                        style = {styles.button}
                    >
                    </RaisedButton>
                </div>
            </div>
        </div>
        )
    }
}

export default CommitPopup