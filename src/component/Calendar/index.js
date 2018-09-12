/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-02-04 ‏‎20:55:34
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-28 11:10:49
 */
import React from 'react';

import { bindTouchDirection } from '../../util/Touch';

import './css/Calendar.css';

export default class Calendar extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			calendarBody: [],
			calendarList: [-4, -3, -2, -1, 0, 1], // 翻页用 mark
		};
	}

    componentDidMount = () => {
    	// 绑定搜索面板滑动事件
    	bindTouchDirection(this.content, direction => {
    		this.props.touch && this.props.touch(direction);
    	});

    	this.refresh();
    }

    // 绑定 判断滑动方向 事件
    bindTouchDirection = (ref, callback) => {
    	let startX, startY, endX, endY;

    	ref.addEventListener('touchstart', e => {
    		startX = e.touches[0].pageX;
    		startY = e.touches[0].pageY;
    	});

    	ref.addEventListener('touchend', e => {
    		endX = e.changedTouches[0].pageX;
    		endY = e.changedTouches[0].pageY;

    		let direction = this.getDirection(startX, startY, endX, endY);

    		callback(direction);
    	});
    }

    //根据起点终点返回方向
    getDirection (startX, startY, endX, endY) {
    	let angx = endX - startX;
    	let angy = endY - startY;
    	let result = '我一直站在此处没有动，等你买橘回来给我付车费';

    	// 如果滑动距离太短
    	if (Math.abs(angx) < 25 && Math.abs(angy) < 25) {
    		return result;
    	}

    	let angle = Math.atan2(angy, angx) * 180 / Math.PI;

    	if (angle >= -135 && angle <= -45) {
    		result = 'down'; // toTop
    	} else if (angle > 45 && angle < 135) {
    		result = 'top'; // toDown
    	} else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    		result = 'right'; // toLeft
    	} else if (angle >= -45 && angle <= 45) {
    		result = 'left'; // toRight
    	}

    	return result;
    }

    refresh = (select = []) => {
    	let { calendarBody, calendarList } = this.state;
    	const { start, end, position } = this.props;

    	// 处理日历本体数据
    	calendarBody = this.handleSelectDate(select, this.transCalendarDatas(start, end));

    	let listLen = calendarList.length;

    	// 本体左右滑动事件
    	// 这里需要清理数组的，不然点多了会影响性能，暂时没做 mark
    	switch(position) {
    		case 'toRight':
    			for(let i = 0; i < calendarList.length; i++) {
    				calendarList[i]--;
    			}
    			if(listLen && calendarList[listLen - 1] == 0) {
    				calendarList.push(1);
    			}
    			// 移除头部元素
    			// calendarList.length >= 6 ? calendarList.shift() : null;
    			break;

    		case 'toLeft':
    			for(let i = 0; i < calendarList.length; i++) {
    				calendarList[i]++;
    			}
    			listLen && calendarList[0] == 0 && calendarList.splice(0, 0, -1);

    			// 移除尾部元素
    			// calendarList.length >= 6 ? calendarList.pop() : null;
    			break;

    		default:

    			break;
    	}

    	return { calendarBody, calendarList };
    }

    /* 设置选中项样式
        这里就是简单遍历，性能会有问题
        优化的话应该是直接确定日期在二维数组中的位置 mark
    */
    handleSelectDate = (select, calendarBody) => {
    	for(let row of calendarBody) {
    		for(let col of row) {
    			let dateCol = new Date(col.dateStr).getTime();

    			for(let item of select) {
    				const { style, badge, changeable = true, date, disabled } = item;

    				let dateItem = new Date(date).getTime();

    				if(dateCol === dateItem) {
    					col = Object.assign(col, { style, badge, changeable, disabled });
    				}
    			}
    		}
    	}
    	return calendarBody;
    }

    /* 将起止日期转化成二维数组 */
    transCalendarDatas = (start, end) => {
    	let calendarDatas = [];
    	const startTimeStamp = new Date(start);
    	const endTimeStamp = new Date(end);
    	const diffDays = this.getDaysByDateString(start, end);
    	// 二维数组行数，每行七个对象
    	const rowNum = Math.ceil(diffDays / 7) + 1;
    	// 开始日期在一星期中的index
    	const indexStart = startTimeStamp.getDay();
    	// 结束日期在一星期中的index
    	const indexEnd = endTimeStamp.getDay();

    	// 初始化二维数组
    	for(let i = 0; i < rowNum; i++) {
    		calendarDatas.push([]);
    	}

    	/*
            获得第一行的第一个日期和最后一行的最后一个日期
            然后求两时间中间的所有日期
            然后把这些日期填到二维数组里
        */
    	// 开始、结束日期的毫秒数
    	// 填满首尾两行
    	let startTime = startTimeStamp.getTime() - indexStart * 24 * 3600 * 1000;
    	let endTime = endTimeStamp.getTime() + (7 - indexEnd - 1) * 24 * 3600 * 1000;

    	// 把日期填到二维数组里
    	let row = 0, count = 0;

    	while(endTime - startTime >= 0) {
    		const dateObj = new Date(startTime);
    		const dateStr = `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate()}`; // /是为了ios new Date时不出错
    		const date = dateObj.getDate();

    		let param = { date, dateStr };
    		/*
                根据传进来的时段设置可点击日期的颜色，
                颜色是在这里设置，点击事件在render的body里
            */

    		param.disabled = !(startTimeStamp.getTime() <= startTime && endTimeStamp.getTime() >= startTime);
    		calendarDatas[row][count % 7] = param;

    		count++;
    		count != 0 && count % 7 == 0 && row++;
    		startTime += 1 * 24 * 3600 * 1000;
    	}

    	return calendarDatas;
    }

    // 获得两个日期间隔天数
    getDaysByDateString = (start, end) => {
    	if(start === undefined || end === undefined) return 1;
    	let startDate = Date.parse(start.replace('/-/g', '/'));
    	let endDate = Date.parse(end.replace('/-/g', '/'));
    	let diffDate = (endDate - startDate) + 1 * 24 * 60 * 60 * 1000;
    	let days = diffDate / (24 * 60 * 60 * 1000);

    	return days;
    }

    handleTdClick = item => this.props.onChange && this.props.onChange(item);

    render = () => {
    	let { select = [] } = this.props;
    	let { currentSelect } = this.state;

    	let { calendarBody, calendarList } = this.refresh(select);

    	let head = [];

    	head.push(
    		<tbody key='body_tbody_-1'>
    			<tr>
    				{
    					WEEK.map((item, i) => {
    						return (
    							<td key={ `week_td_${i}` }>
    								<span>{item}</span>
    							</td>
    						);
    					})
    				}
    			</tr>
    		</tbody>
    	);

    	let body = [];

    	calendarBody.map((item, i) => {
    		body.push(
    			<tbody key={ `body_tbody_${i}` }>
    				<tr>
    					{
    						item.map((jtem, j) => {
    							const { style = {}, date, disabled, badge = { text: '', style: {} } } = jtem;
    							const { text, style: badgeStyle } = badge;

    							return (
    								<td onClick={ () => this.handleTdClick(jtem) } key={ `body_td_${ j }` }>
    									{/* 当disabled为true时，去掉所有样式只显示灰色 */}
    									<div className='cal-text' style={ disabled ? { color: '#949494' } : style }>
    										{ badge ? <div className='cal-badge' style={ disabled ? {} : badgeStyle }>{ text }</div> : null }
    										<span>{ date }</span>
    									</div>
    								</td>
    							);
    						})
    					}
    				</tr>
    			</tbody>
    		);
    	});

    	return (
    		<div className='Calendar' ref={ ref => this.content = ref }>
    			{
    				calendarList.map((item, i) => {
    					return (
    						<div className='container' style={{ transform: `translate3d(${item * -100}%, 0 , 0)`, opacity: !item ? 1 : 0 }} key={ `list_div_${i}` }>
    							<table className='week-name'>
    								{head}
    								{body}
    							</table>
    						</div>
    					);
    				})
    			}
    		</div>
    	);
    }
}

const WEEK = [
	'日',
	'一',
	'二',
	'三',
	'四',
	'五',
	'六'
];