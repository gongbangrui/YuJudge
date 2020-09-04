/*
 * File: HomeContent.tsx
 * Description: 首页主体
 * Created: 2020-8-31 13:16:17
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */


import React from "react";
import {Button, Card} from "antd";
import style from "../home.module.scss";
import NoticeTable from "../../../../components/noticeTable/NoticeTable";
import ProblemTable from "../../../../components/problemTable/ProblemTable";
import RcQueueAnim from "rc-queue-anim";
import {NoticeInfo} from "../../../../models/notice";
import {Problem} from "../../../../models/problem";

interface HomeContentProps {
  notices: NoticeInfo[];
  problems: Problem[];
}

const HomeContent: React.FunctionComponent<HomeContentProps> = (props) => {
  // 跳转到某个problem
  const onGotoProblemButtonClick = (content: any) => {
    const problemId = content.id;
    window.reactRouter.push(`/common/problem/${problemId}`);
  }

  return (
    <RcQueueAnim>
      <div key={"home_content_item1"}>
        <Card title={"公告"} className={style.home_content_item}>
          <NoticeTable notices={props.notices}/>
        </Card>
      </div>

      <div key={"home_content_item2"}>
        <Card title={"最近更新"} className={style.home_content_item}>
          <ProblemTable
            isShowProblemOrder={false}
            problems={props.problems}
            isShowOperations
            showEditButton={false}
            isShowTags={false}
            showPagination={false}
            tableSize={"middle"}
            otherOperations={(content: any) => {
              return (
                <Button
                  type={"link"}
                  onClick={() => onGotoProblemButtonClick(content)}>
                  前往
                </Button>
              )
            }}/>
        </Card>
      </div>
    </RcQueueAnim>
  )
}

export default HomeContent;