/*
 * File: JudgeHostManage.tsx
 * Description: 判题服务器管理页面
 * Created: 2020-08-16 16:41:49
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React, {useEffect, useState} from "react";
import {Button, Card, message} from "antd";
import {createJudgeHost, getJudgeHostsInfo} from "../../../network/judgeHostRequest";
import {JudgeHostInfo, JudgeHostRequest} from "../../../models/judgeHost";
import JudgeHostTable from "../../../components/judgeHostTable/JudgeHostTable";
import {RouteComponentProps} from "react-router-dom";
import JudgeHostEditModal from "./childCmp/JudgeHostEditModal";
import {BaseResponse} from "../../../models/common";
import {PlusOutlined} from "@ant-design/icons";
import RcQueueAnim from "rc-queue-anim";

interface JudgeServerManageProps {

}

const JudgeHostManage: React.FunctionComponent<JudgeServerManageProps & RouteComponentProps> = (props) => {

  // 所有的判题服务器信息
  const [judgeHostsInfo, setJudgeHostInfo] = useState<JudgeHostInfo[]>([]);

  // loading
  const [isJudgeHostTableLoading, setIsJudgeHostTableLoading] = useState<boolean>(false);

  // 是否展示编辑对话框
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

  useEffect(() => {
    getJudgeHosts();
  }, []);

  // 请求判题服务器信息
  const getJudgeHosts = () => {
    setIsJudgeHostTableLoading(true);
    getJudgeHostsInfo()
      .then(res => {
        setJudgeHostInfo(res.data);
        setIsJudgeHostTableLoading(false);
      })
      .catch(() => {
        setIsJudgeHostTableLoading(false);
      })
  }

  // 渲染操作
  const renderOperations = (value: JudgeHostInfo) => {
    return (
      <div>
        <Button type={"link"} onClick={() => onSeeDetailButtonClick(value.id)}>
          查看详情
        </Button>
      </div>
    )
  }

  // 查看详情按钮被单击
  const onSeeDetailButtonClick = (judgeHostId: number) => {
    props.history.push(`/cms/judge_hosts/inspect/${judgeHostId}`)
  }

  // 判题机表格卡片承载内容
  const renderExtra = () => {
    return (
      <Button
        type={"primary"}
        onClick={() => setEditModalVisible(true)} icon={<PlusOutlined/>}>
        新建判题机
      </Button>
    )
  }

  // 创建判题机请求
  const createJudgeHostRequest = (value: JudgeHostRequest) => {
    createJudgeHost(value)
      .then(() => {
        message.success("创建成功~");
        setEditModalVisible(false);
        getJudgeHosts();
      })
      .catch((err: BaseResponse) => {
        message.error(err.message);
      })
  }


  return (
    <RcQueueAnim>
      <div key={"judge-host-inspect"}>
        <Card title={"全部判题机"} extra={renderExtra()}>
          <JudgeHostTable
            isLoading={isJudgeHostTableLoading}
            judgeHosts={judgeHostsInfo}
            operations={renderOperations}/>
          <JudgeHostEditModal
            visible={editModalVisible}
            onCancel={() => setEditModalVisible(false)}
            onConfirm={(v) => createJudgeHostRequest(v)}/>
        </Card>
      </div>
    </RcQueueAnim>

  )
}

export default JudgeHostManage;