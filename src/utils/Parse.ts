async function parseMd(mdText:string) {
  const entities = [];
  let parsedText = "";

  const patterns = [
    { type: 'bold', regex: /\*\*(.*?)\*\*/g },
    { type: 'italic', regex: /\*(.*?)\*/g },
    { type: 'monospace', regex: /`(.*?)`/g },
    { type: 'strikethrough', regex: /~~(.*?)~~/g }
  ];

  let lastMatchEnd = 0;

  while (lastMatchEnd < mdText.length) {
    let closestMatch:any = null;

    patterns.forEach(({ type, regex }) => {
      regex.lastIndex = lastMatchEnd;
      const match = regex.exec(mdText);
      if (match && (!closestMatch || match.index < closestMatch.index)) {
        closestMatch = { type, match };
      }
    });

    if (!closestMatch) {
      parsedText += mdText.slice(lastMatchEnd);
      break;
    }

    const { type, match } = closestMatch;
    const [matchedStr, capture] = match;
    parsedText += mdText.slice(lastMatchEnd, match.index);

    entities.push({
      offset: parsedText.length,
      length: capture.length,
      type
    });

    parsedText += capture;
    lastMatchEnd = match.index + matchedStr.length;
  }

  return { entities, text: parsedText };
}

async function paresToEntity(text: any) {
  var res = [{},{}]

  for (var i = 0; i < text.messages.length; ++ i) {
    res[i] = await parseMd(text.messages[i].text) 
  }

  return res
}

export {
  parseMd,
  paresToEntity
}