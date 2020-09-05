/*
 * File: ProblemSetCount.tsx
 * Description: 题目集统计页面
 * Created: 2020-8-20 16:23:03
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Card} from "antd";
import SubmissionCount from "../../../components/submissionCount/SubmissionCount";
import {SubmissionCountInfo} from "../../../models/submissionInfo";
import {countProblemSetSubmissionInfo} from "../../../network/problemSetRequest";
import {RouteComponentProps} from "react-router-dom";
import style from "../problemSetHome/problemSetHome.module.scss"
import ProblemSetTimeLine from "./childCmp/ProblemSetTimeLine";

interface ProblemSetCountProps {

}

const ProblemSetCount: React.FunctionComponent<ProblemSetCountProps & RouteComponentProps> = (props) => {
  const params: any = props.match.params;
  const problemSetId: number = params.problemSetId;

  const [problemSetSubmissionCounts, setProblemSetSubmissionCounts] = useState<SubmissionCountInfo[]>([]);

  useEffect(() => {
    getProblemSetSubmissionCounts(problemSetId);
  }, [problemSetId]);

  // 获取题目集提交状态
  const getProblemSetSubmissionCounts = (problemSetId: number) => {
    countProblemSetSubmissionInfo(problemSetId)
      .then(res => {
        setProblemSetSubmissionCounts(res.data.items);
      })
  }

  return (
    <div className={style.problem_set_home}>
      <Card
        title={"数据统计"}
        headStyle={{
          textAlign: "center"
        }}>
        <div style={{
          paddingLeft: 200,
          paddingRight: 200
        }}>
          <Card title={"提交趋势"}>
            <SubmissionCount
              showPicker={false}
              submissionCounts={problemSetSubmissionCounts}/>
          </Card>
          <Card title={"时间轴"} style={{
            marginTop: 30
          }}>
            <ProblemSetTimeLine problemSetId={problemSetId}/>
          </Card>
        </div>
      </Card>
    </div>
  )
}

export default ProblemSetCount;