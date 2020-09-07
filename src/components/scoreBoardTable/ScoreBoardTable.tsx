/*
 * File: ScoreBoardTable.tsx
 * Description: 记分板表格组件
 * Created: 2020-08-13 10:24:16
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";
import {ScoreBoardItem, ScoreBoardSolutionInfo} from "../../models/submission";
import {Table} from "antd";
import {tenDecimalToTwentySixDecimal} from "../../utils/math";
import {UserInfo} from "../../models/user";
import classNames from "classnames";
import style from "./scoreBoardTable.module.scss";

interface ScoreBoardTableProps {
  scoreBoardItems: ScoreBoardItem[];
  problemAmount: number;
}

const ScoreBoardTable: React.FunctionComponent<ScoreBoardTableProps> = (props) => {

  // 渲染每一行的信息
  const renderRowInfo = (value: ScoreBoardSolutionInfo, record: any, index: number) => {
    const cellClassnames = classNames(style.problem_cell, {
      [style.accept]: value.isAccepted,
      [style.wrong_answer]: !value.isAccepted && value.tryAmount > 0,
      [style.accept_first]: value.isFirstAc
    });
    return (
      <div key={index} className={cellClassnames}>
        {
          value.tryAmount > 0 &&
          <div>
            <div style={{
              fontWeight: "bold",
              height: 24
            }}>
              {value.timeCost !== 0 ? value.timeCost : " "}
            </div>
            <div>
              {getTryAmount(value.tryAmount)}
            </div>
          </div>
        }
      </div>
    )
  }

  // 渲染尝试数目文字
  const getTryAmount = (amount: number) => {
    return amount + (amount > 1 ? "tries" : "try");
  }

  // 渲染列
  const renderColumns = () => {
    let res = [];
    for (let i = 0; i < props.problemAmount; i++) {
      res.push(
        <Table.Column
          className={style.ant_table_cell}
          key={i}
          title={tenDecimalToTwentySixDecimal(i + 1)}
          align={"center"}
          dataIndex={["solutionInfo", i]}
          render={renderRowInfo}
          width={50}/>
      );
    }
    return res;
  }

  // 渲染队伍信息
  const renderTeamInfo = (value: UserInfo) => {
    return <div>{value.nickname}</div>
  }

  // 渲染ac数量
  const renderAcAmount = (value: number) => {
    return <div>{value}</div>
  }

  return (
    <div className={style.score_board_table}>
      <Table
        size={"small"}
        bordered
        rowKey={"rank"}
        dataSource={props.scoreBoardItems}>
        <Table.Column
          title={"排名"}
          align={"center"}
          width={80}
          render={(value: any, record: any, index: number) => index + 1}/>
        <Table.Column
          title={"用户/队伍"}
          dataIndex={"teamInfo"}
          render={renderTeamInfo}
          align={"center"}
          width={160}/>
        <Table.Column
          title={"AC"}
          dataIndex={"totalAcAmount"}
          render={renderAcAmount}
          align={"center"}
          width={50}/>
        <Table.Column
          title={"罚时"}
          dataIndex={"totalTimePenalty"}
          align={"center"}
          width={80}/>
        {props.scoreBoardItems.length > 0 && renderColumns()}
      </Table>
    </div>
  )
}

ScoreBoardTable.defaultProps = {
  scoreBoardItems: []
}

export default ScoreBoardTable;