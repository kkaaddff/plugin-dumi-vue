import { FTAComment, FTACommentFetch } from '@fta/admin-comments';
import Alert from 'antd/es/alert';
import 'antd/es/alert/style';
import { useEffect, useState } from 'react';

const commentFetch = new FTACommentFetch('//qa-fta-server.amh-group.com');

export default function Comments(props: { id: string }): JSX.Element | null {
  const [authInfo] = useAuthInfo();
  if (!props.id) {
    return process.env.NODE_ENV === 'development' ? (
      <Alert
        closable
        style={{ marginTop: 40 }}
        type="warning"
        message="[开发环境]请将ownerId传入Comment组件"
      />
    ) : null;
  }
  return (
    <div className="markdown">
      <h2>评论</h2>
      <FTAComment
        ownerId={props.id}
        userInfo={authInfo}
        list={commentFetch.list}
        submit={commentFetch.submit}
        del={commentFetch.del}
        like={commentFetch.like}
      />
    </div>
  );
}

type AuthInfo = {
  /**
   * 创建人｜更新人
   */
  userName: string;
  /**
   * 创建人｜更新人 ID
   */
  jobId: string;
  /**
   * 头像
   */
  avatarUrl: string;
};

function useAuthInfo() {
  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    userName: '',
    jobId: '',
    avatarUrl: '',
  });

  useEffect(() => {
    //@ts-ignore
    let tmp = window.AmhUserInfo;
    if (tmp && typeof tmp === 'object') {
      setAuthInfo({
        userName: tmp.name,
        jobId: tmp.id,
        avatarUrl: tmp.avatarUrl,
      });
    }
    console.log('设置用户信息', tmp);
  }, []);

  return [authInfo, setAuthInfo] as const;
}
