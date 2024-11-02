export interface BlockResponse {
    last_edited_time: string; // ex 2022-03-01T19:05:00.000Z
    type: string, // 블럭 타입

    heading_1: HeadingProperty
}

export function fetchNotionData(apikey: string, blockUrl: string): Promise<BlockResponse>;

export interface HeadingProperty {
  rich_text: {
    plain_text: string
  };
}