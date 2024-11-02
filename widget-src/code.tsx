const { widget } = figma
const { AutoLayout, Text } = widget
import { fetchNotionData } from "network/code";

function Widget() {
  const [notionApiKey, setNotionApiKey] = widget.useSyncedState("apiKey", "");
  const [blockUrl, setBlockUrl] = widget.useSyncedState("blockUrl", "");
  const [notionData, setNotionData] = widget.useSyncedState("data", null)

  widget.useEffect(() => {
    fetchNotionData().then((data) => {
        
    });
  }, []);

  return (
    <AutoLayout
      direction="horizontal"
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
      <Text fontSize={32} horizontalAlignText="center">
        Click Me
      </Text>
    </AutoLayout>
  )
}
widget.register(Widget)
