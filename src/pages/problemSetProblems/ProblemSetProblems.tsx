/*
 * File: problemSetProblems.tsx
 * Description: 题目集中的题目展示页面
 * 在此页面中，用户可以预览当前题目集下所有的题目
 * Created: 2020-08-11 13:26:33
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect} from "react";
import {usePaginationState} from "../../hooks/pagination";
import {ProblemSetProblemPaginationRequest} from "../../models/pagination";
import {PAGE_BEGIN, SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE} from "../../config/config";
import {getProblemSetProblems} from "../../network/problemSetRequest";
import {Button, Card, message} from "antd";
import {RouteComponentProps} from "react-router-dom";
import ProblemTable from "../../components/problemTable/ProblemTable";

interface ProblemSetProblemsProps {

}

const ProblemSetProblems: React.FunctionComponent<ProblemSetProblemsProps & RouteComponentProps> = (props) => {
  const params: any = props.match.params;

  const problemSetProblemPagination = usePaginationState<ProblemSetProblemPaginationRequest>(PAGE_BEGIN - 1, getProblemSetProblems);

  useEffect(() => {
    getProblemSetProblemData(PAGE_BEGIN - 1);
  }, []);

  // 获取题目集所有题目
  const getProblemSetProblemData = (start: number) => {
    problemSetProblemPagination
      .changeCurrentPage({
        start: start,
        count: SINGLE_PAGE_SIZE_IN_PROBLEM_MANAGE,
        problemSetId: params.problemSetId
      })
      .catch((err) => {
        message.error(err.message);
      })
  }

  // 跳转到某个problem
  const onGotoProblemButtonClick = (content: any) => {
    const problemId = content.id;
    props.history.push(`/problem_set/${params.problemSetId}/problem/${problemId}`);
  }

  return (
    <div className={"problem-set-home"}>
      <Card
        title={"所有题目"}
        headStyle={{textAlign: "center"}}
        bodyStyle={{
          display: "flex",
          justifyContent: "center"
        }}>
        <ProblemTable
          isLoading={problemSetProblemPagination.isLoading}
          problems={problemSetProblemPagination.items}
          isShowOperations
          showEditButton={false}
          onPageChange={(val: number) => getProblemSetProblemData(val - 1)}
          totalPage={problemSetProblemPagination.paginationInfo.totalPage}
          otherOperations={(content: any) => {
            return (
              <Button
                type={"link"}
                onClick={() => onGotoProblemButtonClick(content)}>
                前往
              </Button>
            )
          }}>
        </ProblemTable>
      </Card>
    </div>
  )
}

export default ProblemSetProblems;