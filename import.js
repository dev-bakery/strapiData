// import.js
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const STRAPI_API = process.env.STRAPI_API_URL || "http://localhost:1337";
const AUTH_TOKEN = process.env.STRAPI_ADMIN_TOKEN; // Strapi Admin Token 넣기

if (!AUTH_TOKEN) {
  console.error("❌ ERROR: STRAPI_ADMIN_TOKEN 이 없습니다.");
  process.exit(1);
}

const filePath = path.join(process.cwd(), "categoryItemData.json");
const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8")).data;

async function importData() {
  console.log(`📦 총 ${jsonData.length}개의 아이템 업로드 시작`);

  for (const item of jsonData) {
    try {
      const res = await fetch(`${STRAPI_API}/api/fashion-triangles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify({ data: item }),
      });

      const result = await res.json();

      if (res.status === 200 || res.status === 201) {
        console.log(`✅ 등록 완료 → itemNo: ${item.itemNo}`);
      } else {
        console.log(`❌ 실패 → itemNo: ${item.itemNo}`, result);
      }
    } catch (err) {
      console.error(`🔥 에러 발생 → itemNo: ${item.itemNo}`, err);
    }
  }

  console.log("🎉 모든 데이터 업로드 완료!");
}

importData();
