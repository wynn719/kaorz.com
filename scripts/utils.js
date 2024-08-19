const path = require("path");
const tencentcloud = require("tencentcloud-sdk-nodejs");

require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

export async function translateTitle(text) {
  const TmtClient = tencentcloud.tmt.v20180321.Client;
  const clientConfig = {
    credential: {
      secretId: process.env.TENCENT_CLOUD_SECRET_ID,
      secretKey: process.env.TENCENT_CLOUD_SECRET_KEY,
    },
    region: "ap-guangzhou",
    profile: {
      httpProfile: {
        endpoint: "tmt.tencentcloudapi.com",
      },
    },
  };

  const client = new TmtClient(clientConfig);
  const params = {
    SourceText: text,
    Source: "zh",
    Target: "en",
    ProjectId: 0,
  };

  try {
    const res = await client.TextTranslate(params);
    return res.TargetText;
  } catch (error) {
    console.error(error);
    return "";
  }
}
