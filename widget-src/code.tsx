const { widget } = figma
const { AutoLayout, Text, useEffect, waitForTask, usePropertyMenu   } = widget
import { fetchNotionData, BlockResponse } from "./network/code";

type NullableBlockResponse = BlockResponse | null;

const defaultBlockResponse: BlockResponse = {
  last_edited_time: "",
  type: "heading_1",
  heading_1: {
    rich_text: {
      plain_text: "테스트"
    }
  }
};

function Widget() {
  const [notionApiKey, setNotionApiKey] = widget.useSyncedState("apiKey", "");
  const [blockUrl, setBlockUrl] = widget.useSyncedState("blockUrl", "");
  const [notionData, setNotionData] = widget.useSyncedState<NullableBlockResponse>("data", defaultBlockResponse)


  // useProperyMenu
  usePropertyMenu(
    [
      {
        tooltip: 'URL 입력', // 버튼에 노출되는 이름
        propertyName: 'InputURL',
        itemType: 'action',
      },
      {
        tooltip: '동기화',
        propertyName: 'Sync',
        itemType: 'action',
      },
    ],
    ({propertyName, propertyValue}) => {
      if (propertyName === "InputURL") {
        return new Promise(() => {
          figma.showUI(
            __html__,
            { width: 500, height: 450 }
          )
          figma.ui.on('message', (msg) => {
            if (msg.type == 'Submit') {
              figma.notify(msg.url)
              figma.closePlugin()
            }
          })
      });
      } else if (propertyName === "Sync") {
        figma.notify(`동기화 하기`)
      }
    },
  )

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
