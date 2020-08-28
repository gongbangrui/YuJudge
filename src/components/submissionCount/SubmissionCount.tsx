/*
 * File: SubmissionCount.tsx
 * Description: 提交数据统计折线图及其操作工具组件
 * Created: 2020-8-19 17:16:25
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {SubmissionCountInfo} from "../../models/submissionInfo";
import LineChart from "../charts/LineChart";
import {Col, DatePicker, Empty, Row, Tag} from "antd";
import {Moment} from "moment";
import {DATE_TIME_FORMAT_BY_HOUR, DEFAULT_DATE_TIME_FORMAT} from "../../config/config";
import moment from "moment";

interface SubmissionCountProps {
  submissionCounts: SubmissionCountInfo[];
  initialTimeRange?: any;
  showPicker?: boolean;
  onPickerChange?: (res: string[]) => void;
  title?: string;
  mask?: string;
}

const SubmissionCount: React.FunctionComponent<SubmissionCountProps> = (props) => {

  useEffect(() => {
    // 如果传入了时间，我们需要初始化这些时间
    if (props.initialTimeRange) {
      setCurrentDataRange(props.initialTimeRange);
    }
    // 只初始化一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const [currentDateRange, setCurrentDataRange] = useState<Moment[]>([]);

  // 获取时间格式, 由于时间差的不同，我们需要不同的格式
  const getDateFormat = () => {
    if (currentDateRange && currentDateRange.length === 2) {
      console.log(currentDateRange);
      const duration = currentDateRange[1].diff(currentDateRange[0], 'days');
      // 超过一天
      if (duration < -1 || duration > 1) {
        return DEFAULT_DATE_TIME_FORMAT;
      }
    }
    return DATE_TIME_FORMAT_BY_HOUR;
  }

  // 处理数据统计信息,以适应图表
  const publishData = () => {
    return props.submissionCounts.map((res) => {
      let t = moment(res.time);
      t.hour(res.hour);
      return {
        submissionAmount: res.submissionAmount,
        hour: t.toDate(),
        time: 0
      }
    })
  }

  // 当选择器发生改变时
  const onPickerChange = (event: Moment[]) => {
    if (!event || event.length !== 2 || !props.onPickerChange) {
      return;
    }
    setCurrentDataRange(event);
    props.onPickerChange([
      event[0].format(DEFAULT_DATE_TIME_FORMAT),
      event[1].format(DEFAULT_DATE_TIME_FORMAT),
    ]);
  }


  return (
    <div>
      <Row
        justify={"space-between"}
        align={"middle"}
        style={{marginBottom: 20}}>
        <Col>
          {
            props.title &&
            <Tag color="geekblue" style={{
              marginLeft: 20
            }}>
              {props.title}
            </Tag>
          }
        </Col>

        <Col>
          {
            props.showPicker &&
            <DatePicker.RangePicker
              showTime
              defaultValue={props.initialTimeRange}
              onChange={(value: any) => onPickerChange(value)}/>
          }
        </Col>

      </Row>
      {
        props.submissionCounts && props.submissionCounts.length ?
          <LineChart
            mask={getDateFormat()}
            isTime
            data={publishData()}
            xKey={"hour"}
            yKey={"submissionAmount"}
            yDescription={"提交数量"}/> :
          <Empty
            description={"该时间段无提交"}
            image={Empty.PRESENTED_IMAGE_SIMPLE}>
          </Empty>
      }
    </div>
  )
}

SubmissionCount.defaultProps = {
  showPicker: true
}

export default SubmissionCount;