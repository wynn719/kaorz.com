import Link from "next/link";
import Layout from "@/components/layout";
import { useState } from "react";
import classNames from "classnames";
import avatar from "@/assets/imgs/avatar.jpg";
import wechat from "@/assets/imgs/wechat.jpg";

function UserInfo() {
  const [infoPic, setInfoPic] = useState(avatar.src);

  function showWechat() {
    setInfoPic(wechat.src);
  }

  function hideWechat() {
    setInfoPic(avatar.src);
  }

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${infoPic})` }}
        className={classNames([
          "cursor-pointer",
          "block",
          "w-[150px]",
          "h-[150px]",
          "rounded",
          "mx-auto",
          "bg-gray-50",
          "bg-[length:150px]",
          "opacity-100",
          "transition-opacity",
          "hover:opacity-80",
        ])}
        onClick={showWechat}
        onMouseOut={hideWechat}
        onAnimationEnd={showWechat}
      ></div>

      <div className="mt-6 mx-auto max-w-[600px] px-3 leading-8">
        <p>90后，热爱互联网，web前端开发</p>
        <p>相比编程，其实更喜欢音乐，耍吉他，然乐盲也，唱歌，然五音不全者也</p>
        <p>好运动，热衷于跑步，然瘦人一枚</p>
        <p>喜读书，然识之有限</p>
        <p>...</p>
      </div>
    </div>
  );
}

const sectionTitleClass = "text-xl mb-2 font-bold";

function Internships() {
  return (
    <div className="mt-10">
      <p className={sectionTitleClass}>Experience!-经历</p>
      <ul>
        <li>
          <p>
            <span>腾讯</span>
            <span>web前端开发</span>
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
    <div className="mt-10">
      <p className={sectionTitleClass}>Keep moving!-我正在做的事情</p>
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
    <div className="mt-10">
      <p className={sectionTitleClass}>Find me!-你可以在这里找到我</p>
      <ul className="overflow-hidden inline-block mx-auto">
        <li className="float-left">
          <Link
            className="block w-10 h-10 leading-10 text-center mr-1.5 bg-[#63a67f] text-white"
            target="_blank"
            href="http://www.douban.com/people/81245114/"
            title="豆瓣"
          >
            豆
          </Link>
        </li>
        <li className="float-left">
          <Link
            className="block w-10 h-10 leading-10 text-center mr-1 bg-[#0767c8] text-white"
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
    <Layout>
      <div className="text-center leading-8 text-lg bg-white dark:bg-[#222831] text-slate-800 dark:text-slate-300 py-16">
        <UserInfo></UserInfo>
        <Internships></Internships>
        <Learning></Learning>
        <SocialLinks></SocialLinks>
      </div>
    </Layout>
  );
}
