import Liteflow from "@liteflow/sdk";

const orgId = process.env.NEXT_PUBLIC_ORG_ID;
if (!orgId) throw new Error("NEXT_PUBLIC_ORG_ID is not defined");
const liteflow = new Liteflow(orgId, {
  baseUrl: "http://localhost:3000/api/v1",
});
export default liteflow;
