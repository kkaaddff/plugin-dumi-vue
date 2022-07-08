import { Avatar } from 'antd';
import 'antd/es/avatar/style';
import { CSSProperties } from 'react';
import './about.less';

const createStyle = (
  fontSize: CSSProperties['fontSize'],
  fontWeight: CSSProperties['fontWeight'],
  color: CSSProperties['color'],
  lineHeight: CSSProperties['lineHeight'],
  marginTop: CSSProperties['marginTop'],
): CSSProperties => ({
  // display: 'block',
  fontSize,
  fontWeight,
  color,
  marginTop,
  lineHeight: lineHeight + 'px',
});

type Contributor = {
  name: string;
  title: string;
  avatar: string;
};

const designers: Contributor[][] = [
  [
    {
      name: '夏天宇',
      title: '规范主理设计',
      avatar:
        'https://imagecdn.ymm56.com/ymmfile/static/resource/2361856c-31a8-4dfa-9d50-7418f0171e95.png',
    },
    {
      name: '张秋兰',
      title: '交互设计',
      avatar:
        'https://imagecdn.ymm56.com/ymmfile/static/resource/f9fb2a89-d18b-4d16-ad80-ee35d911be1c.png',
    },
    {
      name: '张帅',
      title: '视觉设计',
      avatar:
        'https://imagecdn.ymm56.com/ymmfile/static/resource/d6b11d5a-bec2-43b3-8805-b06e7cb5e76f.png',
    },
    {
      name: '夏洁',
      title: '交互设计',
      avatar:
        'https://imagecdn.ymm56.com/ymmfile/static/resource/28bfeb7f-e056-492a-92e1-e173b395642d.png',
    },
    {
      name: '辛磊磊',
      title: '视觉设计',
      avatar:
        'https://imagecdn.ymm56.com/ymmfile/static/resource/9ec5555b-3eae-4d92-b41e-4e208cf6c335.png',
    },
    {
      name: '杨秋晨',
      title: '视觉设计',
      avatar:
        'https://imagecdn.ymm56.com/ymmfile/static/resource/46a73bb9-4c5c-4a1e-b0a7-2589ffbff258.png',
    },
  ],
  [
    {
      name: '居东',
      title: '交互设计',
      avatar:
        'https://imagecdn.ymm56.com/ymmfile/static/resource/89a6fba1-cdbc-41d8-9674-8509639eb129.png',
    },
    {
      name: '臧文桃',
      title: '视觉设计',
      avatar:
        'https://imagecdn.ymm56.com/ymmfile/static/resource/6177e1fb-3ede-41af-8b22-d2291e8a15f1.png',
    },
    {
      name: '王晶晶',
      title: '视觉设计',
      avatar:
        'https://imagecdn.ymm56.com/ymmfile/static/resource/b04d7b93-1cf4-4cd7-8e0e-fc7eb7d1e652.png',
    },
  ],
];

/** 设计团队介绍 */
export function About(): JSX.Element {
  return (
    <>
      <img
        src="https://imagecdn.ymm56.com/ymmfile/static/resource/c33dc98d-691f-4258-9152-ed593a57ade4.png?x-oss-process=image/format,webp/interlace,1"
        alt=""
        width="100%"
      />
      <main>
        <Title>设计团队</Title>
        <SubTitle>About DLC</SubTitle>
        <Text>
          满帮中台用户体验设计团队，简称DLC（Design,Love,Create），主要负责公司中后台B端
          / C端产品体验设计，保持用户体验的一致性，易用性及差异性。
        </Text>
        <Text>
          DLC秉承设计·友爱·创新的价值观点，致力为满帮集团用户体验进行赋能。
        </Text>
        <div>
          {designers.map((persons, index) => (
            <div style={{ display: 'flex', marginTop: 48 }}>
              {persons.map((person, i) => (
                <div key={i} className="__design-about">
                  <Avatar
                    shape="square"
                    src={
                      person.avatar +
                      '?x-oss-process=image/format,webp/interlace,1'
                    }
                    className="__design-designer-avatar"
                  />
                  <div className="__design-designer-name">{person.name}</div>
                  <div className="__design-designer-title">{person.title}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <Title>开发团队</Title>
        <SubTitle>业务中台前端</SubTitle>
        <Text>业务中台前端用户中心组。</Text>
        <Text>共建FTA Family前端研发工程化体系。</Text>
        <div style={{ marginTop: 60, display: 'flex' }}></div>
      </main>
    </>
  );
}

type PropsWithStringChildren = {
  children: string;
};

function Title(props: PropsWithStringChildren): JSX.Element {
  return (
    <p style={createStyle(30, 500, '#141414', 45, 68)}>
      <img
        width={48}
        style={{ marginRight: 20, verticalAlign: 'middle' }}
        src="https://imagecdn.ymm56.com/ymmfile/static/resource/47911654-361f-4a3b-8205-df3d44eb543a.png?x-oss-process=image/format,webp/interlace,1"
      />
      <span style={{ verticalAlign: 'middle' }}>{props.children}</span>
    </p>
  );
}

function SubTitle(props: PropsWithStringChildren) {
  return (
    <p style={createStyle(24, 500, '#141414', 33, 40)}>{props.children}</p>
  );
}

function Text(props: PropsWithStringChildren) {
  return (
    <p style={createStyle(14, 400, '#4c4c4c', 22, 16)}>{props.children}</p>
  );
}
