import { defineStore } from "pinia";
import { getImg } from "@/utils/utils";

export const msgStore = defineStore('msg', {
  state: () => ({
    image: '',
    json: {
      type: "quote",
      format: "webp",
      backgroundColor: "",
      width: 512,
      height: 768,
      scale: 2,
      messages: [
        {
          entities: [{}],
          avatar: true,
          from: {
            id: "420137733",
            name: "Hugo",
            photo: {
              url: "https://t.me/i/userpic/320/zerohugo.jpg"
            }
          },
          text: "果果大笨蛋",
          replyMessage: {}
        }
      ]
    }
  }),
  actions: {
    async generateImg(json: any) {
      try {
        this.image = (await getImg(json))
      } catch (err) {
        
      }
    }
  }
})