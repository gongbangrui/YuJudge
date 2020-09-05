/*
 * File: Profile.tsx
 * Description: 个人中心首页
 * Created: 2020-8-24 14:03:43
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Card, Col, Row} from "antd";
import UserCard from "../../../components/userCard/UserCard";
import {UserInfoState} from "../../../hooks/userInfo";
import style from "./profile.module.scss"
import ProfileCount from "./childCmp/ProfileCount";
import {UserJudgeResultCount, UserSubmissionCount} from "../../../models/submissionInfo";
import moment from "moment";
import {DEFAULT_DATE_TIME_FORMAT, RECENT_SUBMISSION_DATES_IN_DASHBOARD_AMOUNT} from "../../../config/config";
import {getRecentSubmission, getUserJudgeResultCount} from "../../../network/submissionRequest";
import RcQueueAnim from "rc-queue-anim";
import {getUserAcProblemIds, getUserTriedProblemIds} from "../../../network/problemRequests";
import {ProblemCountItem} from "../../../models/problem";

interface profileProps {

}

const Profile: React.FunctionComponent<profileProps> = () => {

  const userInfoState = UserInfoState();

  // 用户提交统计
  const [userJudgeResultCount, setUserJudgeResultCount] = useState<UserJudgeResultCount[]>([]);

  // 近期提交统计
  const [recentSubmissionCount, setRecentSubmissionCount] = useState<UserSubmissionCount[]>([]);

  // 用户ac
  const [acCount, setAcCount] = useState<ProblemCountItem[]>([]);

  // 用户尝试
  const [triedCount, setTriedCount] = useState<ProblemCountItem[]>([]);

  useEffect(() => {
    getAndSetRecentSubmissionCount();
    getUserJudgeResults();
    getAndSetUserAcProblem();
    getAndSetUserTriedProblem();
  }, []);

  // 获取最近提交统计信息
  const getAndSetRecentSubmissionCount = () => {
    const end = moment().add(1, "days").format(DEFAULT_DATE_TIME_FORMAT);
    // 默认提早七天
    const start = moment().add(
      RECENT_SUBMISSION_DATES_IN_DASHBOARD_AMOUNT * (-1),
      "days").format(DEFAULT_DATE_TIME_FORMAT);

    getRecentSubmission(start, end)
      .then(res => {
        setRecentSubmissionCount(res.data);
      })
  }

  // 获取判题结果统计信息
  const getUserJudgeResults = () => {
    getUserJudgeResultCount()
      .then(res => {
        setUserJudgeResultCount(res.data);
      })
  }

  // 获取用户ac题目
  const getAndSetUserAcProblem = (uid: number | null) => {
    getUserAcProblemIds(uid)
      .then(res => {
        setAcCount(res.data);
      })
  }

  // 获取用户ac题目
  const getAndSetUserTriedProblem = (uid: number | null) => {
    getUserTriedProblemIds(uid)
      .then(res => {
        setTriedCount(res.data);
      })
  }

  return (
    <RcQueueAnim>
      <div title={"个人中心"} className={style.profile} key={"profile"}>
        <Card className={style.profile_content}>
          <Row>
            <Col>
              <div className={style.profile_user_info} key={"profile_user_info"}>
                {userInfoState.userInfo && <UserCard userInfo={userInfoState.userInfo}/>}
              </div>
            </Col>
            <Col>
              <div key={"ProfileCount"}>
                <ProfileCount
                  acCount={acCount}
                  triedCount={triedCount}
                  recentSubmission={recentSubmissionCount}
                  userJudgeResultCount={userJudgeResultCount}/>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </RcQueueAnim>
  )
}

export default Profile;