// create markdown post
const fs = require("fs");
const inquirer = require("inquirer").default;
const dayjs = require("dayjs");

(async () => {
  const { title } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the post title:",
    },
  ]);
  const translatedText = await translateTitle(title);
  const { uri, tags, category, excerpt } = await inquirer.prompt([
    {
      type: "input",
      name: "uri",
      message: "Enter the post uri:",
      default: translatedText.replace(/\s/g, "-"),
    },
    {
      type: "input",
      name: "tags",
      message: "Enter tags (comma-separated):",
    },
    {
      type: "list",
      name: "category",
      message: "Choose a category:",
      choices: ["life", "tech"],
    },
    {
      type: "input",
      name: "excerpt",
      message: "Enter an excerpt:",
    },
  ]);

  const time = dayjs().format("YYYY-MM-DD HH:mm");
  const content = `---
title: ${title}
layout: post
time: ${time}
tag:
${tags
  .split(",")
  .map((tag) => `- ${tag}`)
  .join("\n")}
categories:
- ${category}

excerpt: ${excerpt}
draft: true
---

post content
`;

  const date = dayjs().format("YYYY-MM-DD");
  fs.writeFileSync(
    path.join(__dirname, "../", `posts/${date}-${uri}.md`),
    content.trim()
  );
  console.log("Markdown file created:", `${date}-${uri}.md`);
})();
