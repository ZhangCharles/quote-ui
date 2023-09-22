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
          media: {
            url: "",
          },
          mediaType: "",
          avatar: true,
          from: {
            id: "420137733",
            name: "Hugo",
            photo: {
              url: "https://t.me/i/userpic/320/zerohugo.jpg"
            }
          },
          text: "",
          replyMessage: {}
        }
      ]
    },
    default: [
      {
        name: "Hugo",
        id: "420137733",
        avatar: "https://t.me/i/userpic/320/zerohugo.jpg"
      },
      {
        name: "Kurenai Ryu",
        id: "1087480007",
        avatar: "https://s2.loli.net/2023/09/19/WxcJ2MSBRNjHD5Q.png"
      },
      {
        name: "Anshang",
        id: "1316664436",
        avatar: "https://t.me/i/userpic/320/AnshangPro.jpg"
      }
    ]
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