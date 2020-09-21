import fetch from "node-fetch";
import { ACCESS_TOKEN, VK_API_VERSION, VK_API_ENDPOINT } from "./config";

const vkApiRequest = async (method: string, data: any) => {
  try {
    const params = new URLSearchParams();
    params.append("random_id", `${Math.round(Math.random() * 10 ** 17)}`);

    for (let key in data) {
      const value = data[key];

      if (value !== undefined) {
        params.append(
          key,
          typeof value === "string" ? value : JSON.stringify(value)
        );
      }
    }

    params.append("access_token", ACCESS_TOKEN);
    params.append("v", VK_API_VERSION);

    const response = await (
      await fetch(`${VK_API_ENDPOINT}${method}?${params.toString()}`)
    ).json();

    console.log(response);
  } catch (error) {
    console.error("VK api request error:", error);

    throw error;
  }
};

export const sendMessage = (
  peer_id: number,
  message?: string,
  keyboard?: any
) => {
  vkApiRequest("messages.send", {
    peer_id,
    message,
    keyboard,
  });
};

export const editChat = (chat_id: number, title: string) => {
  vkApiRequest("messages.editChat", { chat_id, title });
};

export const botStart = (peer_id: number) => {
  vkApiRequest("messages.send", {
    message: "✅",
    peer_id,
    keyboard: {
      inline: false,
      one_time: false,
      buttons: [
        [
          {
            action: {
              type: "text",
              payload: '{"button": "1"}',
              label: "Изменить название",
            },
            color: "primary",
          },
          {
            action: {
              type: "text",
              payload: '{"button": "2"}',
              label: "Напомнить Леше",
            },
            color: "negative",
          },
          {
            action: {
              type: "text",
              payload: '{"button": "3"}',
              label: "Курс доллара",
            },
            color: "secondary",
          },
        ],
      ],
    },
  });
};