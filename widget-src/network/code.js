export async function fetchNotionData(apiKey, blockUrl) {
    const notionPageId = getBlockIdAndNotify(blockUrl); // URL에서 ID 추출하는 함수
    const response = await fetch(`https://api.notion.com/v1/blocks/${notionPageId}`, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        'Access-Control-Allow-Origin': '*'
      }
    });
    const data = await response.json();
    console.log(data)
    return data;
  }

function extractBlockIdFromUrl(url) {
    // 32자리의 영숫자 ID를 찾기 위한 정규식
    const match = url.match(/[0-9a-fA-F]{32}/);
    if (match) {
      return match[0];
    }
    throw new Error("유효한 ID를 URL에서 찾을 수 없습니다.");
}

function getBlockIdAndNotify(url) {
    try {
      return extractBlockIdFromUrl(url);
    } catch (error) {
      figma.notify("URL에서 tion 페이지No ID를 찾을 수 없습니다. URL을 확인해주세요.");
      return null;
    }
  }