const { widget } = figma
const { AutoLayout, Text, useEffect, waitForTask  } = widget
import { fetchNotionData, BlockResponse } from "network/code";

type NullableBlockResponse = BlockResponse | null;

function Widget() {
  const [notionApiKey, setNotionApiKey] = widget.useSyncedState("apiKey", "");
  const [blockUrl, setBlockUrl] = widget.useSyncedState("blockUrl", "");
  const [notionData, setNotionData] = widget.useSyncedState<NullableBlockResponse>("data", null)

  useEffect(() => {

    waitForTask(new Promise(resolve => {
      figma.ui.onmessage = (msg) => {
        if (msg == "FetchData") {
          fetchNotionData(notionApiKey, blockUrl).then((data) => {
            setNotionData(data)
          }).catch((error) => {
            console.error("Error fetching Notion data:", error);
            figma.notify("Notion 데이터를 불러오는 중 오류가 발생했습니다.");
          });
        }
      }
    }))
  });

  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      height="hug-contents"
      padding={8}
      fill="#FFFFFF"
      cornerRadius={8}
      spacing={12}
      onClick={async () => {
        await new Promise((resolve) => {
          figma.showUI(__html__)
          figma.ui.on('message', (msg) => {
            if (msg === 'hello') {
              figma.notify(`Hello Widgets`)
            }
            if (msg === 'close') {
              figma.closePlugin()
            }
          })
        })
      }}
    >
      {notionData ? (
        <>
          {notionData.type === "heading_1" && (
            <Text fontSize={24}>
              {notionData.heading_1?.rich_text.plain_text}
            </Text>
          )}
               {/* 필요한 경우 다른 블록 타입 처리 추가 */}
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </AutoLayout>
  )
}
widget.register(Widget)
