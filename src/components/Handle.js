import React from 'react'

export default function Handle(props) {
    let p_color = 'black';
    if (props.rank === 'newbie') { p_color = 'gray' }
    if (props.rank === 'pupil') { p_color = 'green' }
    if (props.rank === 'specialist') { p_color = '#03a89e' }
    if (props.rank === 'expert') { p_color = 'blue' }
    if (props.rank === 'candidate master') { p_color = 'purple' }
    if (props.rank === 'master' || props.rank === 'international master') { p_color = 'orange' }
    if (props.rank === 'grandmaster') { p_color = 'red' }
    if (props.rank === 'international grandmaster') { p_color = 'red' }
    if (props.rank === 'legendary grandmaster') { p_color = 'red' }

    let handle = props.handleName;

    if (props.rank == 'legendary grandmaster') {
        let s = handle;
        let first = handle[0];
        s = s.substring(1);
        return (
            <div className='showHandle'>
                <font size='6'><b><font color='black'>{first}</font><font color='red'>{s}</font></b></font>
            </div>
        )
    }
    if (props.rank == '') {
        return (
            <div className='showHandle'>
                <font size='6' color={p_color}>{handle}</font>
            </div>
        )
    }
    return (
        <div className='showHandle'>
            <font size='6' color={p_color}><b>{handle}</b></font>
        </div>
    )
}
