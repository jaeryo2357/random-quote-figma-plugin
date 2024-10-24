import {
  PluginAction,
  PluginCallbackFunction,
  PluginMessagePayload,
} from '../shared';

figma.showUI(__html__);

//async function fetchNotionData(pageUrl) {
  //const notionKey = "your_notion_api_key";
  //const notionPageId = extractPageIdFromUrl(pageUrl); // 페이지 URL에서 ID 추출하는 함수
  //const response = await fetch(`https://api.notion.com/v1/pages/${notionPageId}`, {
  //  headers: {
  //    "Authorization": `Bearer ${notionKey}`,
  //    "Notion-Version": "2022-06-28"
  //  }
  //});
  //const data = await response.json();
  //return data;
//}

async function loadFonts() {
  await figma.loadFontAsync({
    family: 'Roboto',
    style: 'Regular',
  });
}

function isPayload(payload: unknown): payload is PluginMessagePayload {
  return (
    typeof payload === 'object' &&
    Object.prototype.hasOwnProperty.call(payload, 'type') &&
    Object.prototype.hasOwnProperty.call(payload, 'randomQuote')
  );
}

function generateRandomQuote({ randomQuote }: PluginMessagePayload) {
  const currentSelectionNode = figma.currentPage.selection[0];
  if (currentSelectionNode?.type === 'TEXT') {
    currentSelectionNode.fontName = {
      family: 'Roboto',
      style: 'Regular',
    };
    currentSelectionNode.characters = `${randomQuote.text} - ${
      randomQuote.author || 'Unknown'
    }`;
  } else {
    throw new Error('No text node is selected');
  }
}

loadFonts().then(() => {
  figma.ui.onmessage = (payload: unknown) => {
    const callbackMap: Record<PluginAction, PluginCallbackFunction> = {
      generateRandomQuote,
    };

    if (isPayload(payload) && callbackMap[payload.type]) {
      callbackMap[payload.type](payload);
    }
  };
});
