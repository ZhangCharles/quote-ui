import axios from "axios"

async function generate(json:any, entities: any) {

  var submit = {
    type: "quote",
      format: "webp",
      backgroundColor: json.backgroundColor,
      width: 512,
      height: 768,
      scale: 2,
      messages: [
        {
        entities: [],
        media: undefined,
        mediaType: undefined,
        avatar: true,
        from: {},
        text: "",
        replyMessage: {}
      }
    ]
  }
  for (var i = 0; i < json.messages.length; ++ i) {
    if (i >= 1) {
      submit.messages.push({
        entities: [],
        media: undefined,
        mediaType: undefined,
        avatar: true,
        from: {},
        text: "",
        replyMessage: {}
      })
    }
    submit.messages[i].entities = entities[i].entities
    submit.messages[i].text = entities[i].text
    submit.messages[i].from = json.messages[i].from
    submit.messages[i].avatar = json.messages[i].avatar
    submit.messages[i].replyMessage = json.messages[i].replyMessage
    
    if (json.messages[i].media.url === "") {
      delete submit.messages[i].media
      delete submit.messages[i].mediaType
    } else {
      submit.messages[i].media = json.messages[i].media
      if (json.messages[i].mediaType === "sticker") {
        submit.messages[i].mediaType = json.messages[i].mediaType
      }
    }
  }
  console.log(submit)
  var result

  const response = axios.post(`/api/generate`, JSON.stringify(submit), {
    headers: {'Content-Type': 'application/json' }
  }).then(res => {
    result = res.data.result.image
  })
  await response
  const img:string = 'data:image/webp;base64,'+result
  return { img }
}

export {
  generate
}