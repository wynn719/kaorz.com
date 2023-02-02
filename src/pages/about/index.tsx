import Link from "next/link";
import Layout from "@/components/layout";
import { useState } from "react";
import avatar from '@/assets/imgs/avatar.jpg';
import wechat from '@/assets/imgs/wechat.jpg';

function UserInfo() {
  const [className, setClassName] = useState("");
  const [infoPic, setInfoPic] = useState(avatar.src);

  return (
    <div className="user-info">
      <div
        id="me-pic"
        style={{ backgroundImage: `url(${infoPic})`}}
        className={className}
        onMouseOut={() => {
          setClassName("");
          setInfoPic(avatar.src);
        }}
        onAnimationEnd={() => {
          setClassName("hover")
          setInfoPic(wechat.src);
        }}
      ></div>

      <div className="me-intro">
        <p>90后，热爱互联网，web前端开发</p>
        <p>相比编程，其实更喜欢音乐，耍吉他，然乐盲也，唱歌，然五音不全者也</p>
        <p>好运动，热衷于跑步，然瘦人一枚</p>
        <p>喜读书，然识之有限</p>
        <p>...</p>
      </div>
    </div>
  );
}

function Internships() {
  return (
    <div className="internships">
      <p className="title">Experience!-经历</p>
      <ul>
        <li className="internship">
          <p>
            <span className="place">腾讯实习</span>
            <span className="position">web前端开发</span>
            <span className="time">2015-07-04 - 2015-12-21</span>
          </p>
        </li>
        <li>
          <p>...</p>
        </li>
      </ul>
    </div>
  );
}

function Learning() {
  return (
    <div className="learning">
      <p className="title">Keep moving!-我正在做的事情</p>
      <ul>
        <li>学习Linux</li>
        <li>学习Laravel</li>
        <li>...</li>
      </ul>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="social-links">
      <p className="title">Find me!-你可以在这里找到我</p>
      <ul>
        <li className="link">
          <Link
            className="douban"
            target="_blank"
            href="http://www.douban.com/people/81245114/"
            title="豆瓣"
          >
            豆
          </Link>
        </li>
        <li className="link">
          <Link
            className="zhihu"
            target="_blank"
            href="https://www.zhihu.com/people/wayne_zheng"
            title="知乎"
          >
            知
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default function About() {
  return (
    <Layout home={false}>
      <div className="about">
        <UserInfo></UserInfo>
        <Internships></Internships>
        <Learning></Learning>
        <SocialLinks></SocialLinks>
      </div>
    </Layout>
  );
}
