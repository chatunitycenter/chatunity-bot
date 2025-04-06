const ApiKeyHercai = "RtjHwyCkQGTmUm6NyZv3MR9Hoyda11NIMWcuqBR0=";
const fetch = require('node-fetch');
const aiLibrary = require('unlimited-ai');
const { gpt } = require("gpti");
let AiTempSave = {};
let AiTempSave2 = {};

async function models() {
  return {
    text: ["gpt-4o-mini", "gpt-4-turbo", "gpt-4o", "grok-2", "grok-2-mini", "grok-beta", "claude-3-opus", "claude-3-sonnet", "claude-3-5-sonnet", "claude-3-5-sonnet-2", "gemini"],
    textv2: [
      "gpt-4", "gpt-4-0613", "gpt-4-32k", "gpt-4-0314", "gpt-4-32k-0314",
      "gpt-3.5-turbo", "gpt-3.5-turbo-16k", "gpt-3.5-turbo-0613", "gpt-3.5-turbo-16k-0613",
      "gpt-3.5-turbo-0301", "text-davinci-003", "text-davinci-002", "code-davinci-002",
      "gpt-3", "text-curie-001", "text-babbage-001", "text-ada-001",
      "davinci", "curie", "babbage", "ada", "babbage-002", "davinci-002"
    ],
    textv3: [
      "v3", "v3-32k", "turbo", "turbo-16k",
      "gemini", "llama3-70b", "llama3-8b", "mixtral-8x7b",
      "gemma-7b", "gemma2-9b"
    ],
    image: ["dalle", "v1", "v2", "v2-beta", "lexica", "prodia", "simurg", "animefy", "raava", "shonin"]
  };
}

async function clear() {
  AiTempSave = {};
  return true;
}

function getModel(modelim) {
  const modelMap = {
    "gpt-4o-mini": "gpt-4o-mini",
    "gpt-4-turbo": "gpt-4-turbo-2024-04-09",
    "gpt-4o": "gpt-4o-2024-08-06",
    "grok-2": "grok-2",
    "grok-2-mini": "grok-2-mini",
    "grok-beta": "grok-beta",
    "claude-3-opus": "claude-3-opus-20240229",
    "claude-3-sonnet": "claude-3-sonnet-20240229",
    "claude-3-5-sonnet": "claude-3-5-sonnet-20240620",
    "claude-3-5-sonnet-2": "claude-3-5-sonnet-20241022",
    "gemini": "gemini-1.5-flash-exp-0827"
  };
  return modelMap[modelim] || "gpt-4o-2024-08-06";
}

function getModelImage(modelim) {
  const modelMap = {
    "dalle": "v3/text2image",
    "v1": "v1/text2image",
    "v2": "v2/text2image",
    "v2-beta": "v2-beta/text2image",
    "lexica": "lexica/text2image",
    "prodia": "prodia/text2image",
    "simurg": "simurg/text2image",
    "animefy": "animefy/text2image",
    "raava": "raava/text2image",
    "shonin": "shonin/text2image"
  };
  return modelMap[modelim] || "v3/text2image";
}

async function imageGenV2(textin, model = 'dalle') {
  if (!textin) throw new Error("Falta fornecer um texto.");
  const modelOfc = getModelImage(model);
  const url = `https://hercai.onrender.com/${modelOfc}?prompt=${encodeURIComponent(textin)}&negative_prompt=${encodeURIComponent("Bad quality, missing body parts, deformed body, meaningless image, poor quality, Deformed body parts, missing limbs, extra limbs")}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: { "Content-Type": "application/json", "Authorization": ApiKeyHercai }
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const apiResponse = await response.json();
  return { url: apiResponse.url, prompt: textin, model: model };
}

async function ia(text, model = 'gpt-4o', idChat = false) {
  if (!text) throw new Error("Falta fornecer um texto.");
  const modelOfc = getModel(model);

  if (!idChat) {
    const formattedMessages = [{ role: 'user', content: text }];
    const response = await aiLibrary.generate(modelOfc, formattedMessages);
    return response;
  } else {
    if (!AiTempSave[model]) AiTempSave[model] = {};
    if (!AiTempSave[model][idChat]) AiTempSave[model][idChat] = [];

    const formattedMessages = [
      ...AiTempSave[model][idChat].map(msg => ({ role: msg.role, content: msg.content })),
      { role: 'user', content: text }
    ];
    const response = await aiLibrary.generate(modelOfc, formattedMessages);

    AiTempSave[model][idChat].push({ role: 'user', content: text });
    AiTempSave[model][idChat].push({ role: 'assistant', content: response });
    AiTempSave[model][idChat] = AiTempSave[model][idChat].slice(-10);

    return response;
  }
}

async function textV2(input, model = "gpt-4", idChat = false) {
  if (!input) throw new Error("Falta fornecer um texto.");

  if (!AiTempSave2[model]) AiTempSave2[model] = {};
  if (idChat && !AiTempSave2[model][idChat]) AiTempSave2[model][idChat] = [];

  const messages = idChat
    ? [...AiTempSave2[model][idChat].map(msg => ({ role: msg.role, content: msg.content })), { role: "user", content: input }]
    : [{ role: "user", content: input }];

  const response = await gpt.v1({ 
    messages, 
    model, 
    prompt: input, 
    markdown: false 
  });

  if (idChat) {
    AiTempSave2[model][idChat].push({ role: "user", content: input });
    AiTempSave2[model][idChat].push({ role: "assistant", content: response.gpt });

    AiTempSave2[model][idChat] = AiTempSave2[model][idChat].slice(-10);
  }

  return response.gpt;
}

async function textV3(input, model = "v3") {
  if (!input) throw new Error("Falta fornecer um texto.");

  const url = `https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(input)}&model=${model}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": ApiKeyHercai
    }
  });

  if (!response.ok) throw new Error(`Erro: ${response.status}`);
  const result = await response.json();
  return result.reply
};


const ai = Object.assign(ia, {
  models,
  clear,
  image: imageGenV2,
  v3: textV3,
  v2: textV2
});

module.exports = ai;