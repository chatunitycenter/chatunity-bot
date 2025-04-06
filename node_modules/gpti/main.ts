/*
    Author: yandricr
    API: https://nexra.aryahcr.cc/
*/

import axios from "axios";

/* types */

type messages_ = {
    role?: "user" | "assistant",
    content?: string
}

type gptv1_d = {
    prompt?: string,
    messages: messages_[],
    model?: string,
    markdown?: boolean
}

type gptweb_d = {
    prompt: string,
    markdown?: boolean
}

type chatn_d = {
    messages?: messages_[],
    markdown?: boolean,
    stream?: boolean,
    results?: (err?: any, data?: any) => void
}

type bing_d = {
    messages: messages_[],
    markdown?: boolean,
    stream?: boolean,
    conversation_style?: "Balanced" | "Creative" | "Precise",
    results?: (err?: any, data?: any) => void
}

type imageai_d = {
    prompt: string,
    model: string,
    response?: "base64" | "url"
    data?: Object
}

/* types */

const sleep = async (n: number) => {
    return new Promise((res) => {
        try {
            setTimeout(() => {
                return res("OK");
            }, n);
        } catch (error) {
            return res("OK");   
        }
    });
}

let cred = {
    "x-nexra-user": null,
    "x-nexra-secret": null
}

const nexra = (user: any, secret: any) => {
    cred["x-nexra-secret"] = secret;
    cred["x-nexra-user"] = user;
}

async function consult_(api: any, data: any) {
    return new Promise(async(res, rej) => {
        try {
            let request = await axios.post(api, data, {
                headers: {
                    "Content-Type": "application/json",
                    ...cred
                }
            });

            if(request.status != 200){
                throw new Error("error");   
            }

            let id: any = request.data.id;
            let response: any = null;
            let data_ = true;
            let result = null;
            let success_ = false;
            while(data_){
                await sleep(1000);
                response = await axios.get('https://nexra.aryahcr.cc/api/chat/task/' + encodeURIComponent(id));
                response = response.data;
                
                switch(response.status){
                    case "pending":
                        data_ = true;
                        break;
                    case "error":
                    case "completed":
                        success_ = true;
                        result = response;
                    case "not_found":
                    default:
                        result = response;
                        data_ = false;
                        break;
                }
            }

            if(result === undefined || result === null){
                throw new Error("error");
            }

            if(success_ === false){
                return rej(result);
            } else {
                return res(result);
            }
        } catch (error: any) {
            try {
                if(error.response){
                    if(typeof error.response.data === "object"){
                        return rej(error.response.data);
                    } else {
                        throw new Error("error");
                    }
                } else if(error.request){
                    return rej({
                        "code": 404,
                        "error": "NOT_FOUND",
                        "message": "the service is currently unavailable"
                    });
                } else {
                    return rej({
                        "code": 500,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            } catch(e){
                return rej({
                    "code": 500,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                });
            }
        }
    });
}

async function consult_img(data: any) {
    return new Promise(async(res, rej) => {
        try {
            let request = await axios.post("https://nexra.aryahcr.cc/api/image/complements", data, {
                headers: {
                    "Content-Type": "application/json",
                    ...cred
                }
            });

            if(request.status != 200){
                throw new Error("error");   
            }

            let id: any = request.data.id;
            let response: any = null;
            let data_ = true;
            let result = null;
            let success_ = false;
            while(data_){
                await sleep(1000);
                response = await axios.get('https://nexra.aryahcr.cc/api/image/complements/' + encodeURIComponent(id));
                response = response.data;
                
                switch(response.status){
                    case "pending":
                        data_ = true;
                        break;
                    case "error":
                    case "completed":
                        success_ = true;
                        result = response;
                    case "not_found":
                    default:
                        result = response;
                        data_ = false;
                        break;
                }
            }

            if(result === undefined || result === null){
                throw new Error("error");
            }

            if(success_ === false){
                return rej(result);
            } else {
                return res(result);
            }
        } catch (error: any) {
            try {
                if(error.response){
                    if(typeof error.response.data === "object"){
                        return rej(error.response.data);
                    } else {
                        throw new Error("error");
                    }
                } else if(error.request){
                    return rej({
                        "code": 404,
                        "error": "NOT_FOUND",
                        "message": "the service is currently unavailable"
                    });
                } else {
                    return rej({
                        "code": 500,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            } catch(e){
                return rej({
                    "code": 500,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                });
            }
        }
    });
}

async function consult_strm(api: any, data: any, process: (err: any, data: any) => void){
    try {
        let response = await axios.post(api, {
            ...data,
            "stream": true
        }, {
            headers: {
                "Content-Type": "application/json",
                ...cred
            },
            responseType: "stream"
        });

        if(response.status === 200){
            let chat: any = null;
            let error: any = false;
            let tmp: any = null;
            
            response.data.on("data", (chunk: any) => {
                let chk = chunk.toString();
                chk = chk.split("");
        
                chk.forEach((data: any) => {
                    let result = null;
                    let convert = "";
                    
                    try {
                        convert = JSON.parse(data);
                        result = data;
                        tmp = null;
                    } catch(e){
                        if(tmp === null){
                            tmp = data;
                        } else {
                            try {
                                convert = JSON.parse(tmp);
                                result = tmp;
                                tmp = null;
                            } catch(e){
                                tmp = tmp + data;
                                try {
                                    convert = JSON.parse(tmp);
                                    result = tmp;
                                    tmp = null;
                                } catch(e){
                                    tmp = tmp;
                                }
                            }
                        }
                    }
        
                    if(result != null){
                        try {
                            result = JSON.parse(result);
                            if(chat === null && result != null){
                                chat = "";
                            }

                            if(result != undefined && result != null && result.code === undefined && result.status === undefined){
                                if(error != true){
                                    if(result != undefined && result != null && result.finish != undefined && result.finish != null && result.finish === true){
                                        chat = result;
                                    } else {
                                        chat = result;
                                        process(null, result);
                                    }
                                }
                            } else {
                                error = true;
                                chat = result;
                            }
                        } catch(e){
                            // continue
                        }
                    }
                });
            })
        
            response.data.on("end", () => {
                if(chat != null){
                    if(error != true){
                        return process(null, chat);
                    } else {
                        return process(chat, null);
                    }
                } else {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            });
        
            response.data.on("error", (err: any) => {
                
            });
        } else {
            return process({
                "code": 500,
                "status": false,
                "error": "INTERNAL_SERVER_ERROR",
                "message": "general (unknown) error"
            }, null);
        }
    } catch (error: any) {
        try {
            if (error.response) {
                try {
                    let err: any = null;
                    error.response.data.on("data", (chk: any) => {
                        if(err != null){
                            err += chk.toString();
                        } else {
                            err = chk.toString();
                        }
                    });

                    error.response.data.on("end", () => {
                        try {
                            err = JSON.parse(err);
                            return process(err, null);
                        } catch (error) {
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        }
                    });

                    error.response.data.on("error", () => {
                        
                    });
                } catch (error) {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            } else if (error.request) {
                return process({
                    "code": 404,
                    "error": "NOT_FOUND",
                    "message": "the service is currently unavailable"
                }, null);
            } else {
                return process({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                }, null);
            }
        } catch (error) {
            return process({
                "code": 500,
                "status": false,
                "error": "INTERNAL_SERVER_ERROR",
                "message": "general (unknown) error"
            }, null);
        }
    }
}

class gpt {
    static async v1({
        prompt = "",
        messages = [],
        model = "",
        markdown = false
    }: gptv1_d){
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_("https://nexra.aryahcr.cc/api/chat/gpt", {
                    messages: messages,
                    prompt: prompt,
                    model: model,
                    markdown: markdown
                });

                return res(response);
            } catch (error: any) {
                if(typeof error === "object"){
                    return rej(error);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    }
    static async v2({
        messages = [],
        markdown = false,
        stream = false,
        results = () => {}
    }: chatn_d){
        let stream_ = false;
        try {
            if(stream === true){
                stream_ = true;
            } else {
                throw new Error("error");
            }
        } catch (error) {
            stream_ = false;
        }

        if(stream_ === false){
            return new Promise(async (res, rej) => {
                try {
                    let response = await consult_("https://nexra.aryahcr.cc/api/chat/complements", {
                        messages: messages,
                        markdown: markdown,
                        stream: false,
                        model: "chatgpt"
                    });

                    return res(response);
                } catch (error: any) {
                    if(typeof error === "object"){
                        return rej(error);
                    } else {
                        return rej({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        });
                    }
                }
            });
        } else {
            consult_strm("https://nexra.aryahcr.cc/api/chat/complements", {
                messages: messages,
                markdown: markdown,
                stream: false,
                model: "chatgpt"
            }, (err: any, data: any) => {
                if(data?.finish === true){
                    return results(err, data);
                } else {
                    results(err, data);
                }
            });
        }
    }
    static async v3({
        messages = [],
        markdown = false,
        stream = false,
        results = () => {}
    }: chatn_d){
        let stream_ = false;
        try {
            if(stream === true){
                stream_ = true;
            } else {
                throw new Error("error");
            }
        } catch (error) {
            stream_ = false;
        }

        if(stream_ === false){
            return new Promise(async (res, rej) => {
                try {
                    let response = await consult_("https://nexra.aryahcr.cc/api/chat/complements", {
                        messages: messages,
                        markdown: markdown,
                        stream: false,
                        model: "gpt-4o"
                    });

                    return res(response);
                } catch (error: any) {
                    if(typeof error === "object"){
                        return rej(error);
                    } else {
                        return rej({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        });
                    }
                }
            });
        } else {
            consult_strm("https://nexra.aryahcr.cc/api/chat/complements", {
                messages: messages,
                markdown: markdown,
                model: "gpt-4o"
            }, (err: any, data: any) => {
                if(data?.finish === true){
                    return results(err, data);
                } else {
                    results(err, data);
                }
            });
        }
    }
    static async web({
        prompt = "",
        markdown = false
    }: gptweb_d){
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_("https://nexra.aryahcr.cc/api/chat/gptweb", {
                    prompt: prompt,
                    markdown: markdown
                });

                return res(response);
            } catch (error: any) {
                if(typeof error === "object"){
                    return rej(error);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    }
}

const bing = async ({
    messages = [],
    markdown = false,
    stream = false,
    conversation_style = "Balanced",
    results = () => {}
}: bing_d) => {
    let stream_ = false;
    try {
        if(stream === true){
            stream_ = true;
        } else {
            throw new Error("error");
        }
    } catch (error) {
        stream_ = false;
    }

    if(stream_ === false){
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_("https://nexra.aryahcr.cc/api/chat/complements", {
                    messages: messages,
                    markdown: markdown,
                    stream: false,
                    conversation_style: conversation_style,
                    model: "Bing"
                });

                return res(response);
            } catch (error: any) {
                if(typeof error === "object"){
                    return rej(error);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    } else {
        consult_strm("https://nexra.aryahcr.cc/api/chat/complements", {
            messages: messages,
            markdown: markdown,
            conversation_style: conversation_style,
            model: "Bing"
        }, (err: any, data: any) => {
            if(data?.finish === true){
                return results(err, data);
            } else {
                results(err, data);
            }
        });
    }
}

const llama = async ({
    messages = [],
    markdown = false,
    stream = false,
    results = () => {}
}: chatn_d) => {
    let stream_ = false;
    try {
        if(stream === true){
            stream_ = true;
        } else {
            throw new Error("error");
        }
    } catch (error) {
        stream_ = false;
    }

    if(stream_ === false){
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_("https://nexra.aryahcr.cc/api/chat/complements", {
                    messages: messages,
                    markdown: markdown,
                    stream: false,
                    model: "llama-3.1"
                });

                return res(response);
            } catch (error: any) {
                if(typeof error === "object"){
                    return rej(error);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    } else {
        consult_strm("https://nexra.aryahcr.cc/api/chat/complements", {
            messages: messages,
            markdown: markdown,
            model: "llama-3.1"
        }, (err: any, data: any) => {
            if(data?.finish === true){
                return results(err, data);
            } else {
                results(err, data);
            }
        });
    }
}

const blackbox = async ({
    messages = [],
    markdown = false,
    stream = false,
    results = () => {}
}: chatn_d) => {
    let stream_ = false;
    try {
        if(stream === true){
            stream_ = true;
        } else {
            throw new Error("error");
        }
    } catch (error) {
        stream_ = false;
    }

    if(stream_ === false){
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_("https://nexra.aryahcr.cc/api/chat/complements", {
                    messages: messages,
                    markdown: markdown,
                    stream: false,
                    model: "blackbox"
                });

                return res(response);
            } catch (error: any) {
                if(typeof error === "object"){
                    return rej(error);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    } else {
        consult_strm("https://nexra.aryahcr.cc/api/chat/complements", {
            messages: messages,
            markdown: markdown,
            model: "blackbox"
        }, (err: any, data: any) => {
            if(data?.finish === true){
                return results(err, data);
            } else {
                results(err, data);
            }
        });
    }
}

const imageai = async ({
    prompt = "",
    model = "",
    response = "url",
    data: Object
}: imageai_d) => {
    return new Promise(async (res, rej) => {
        try {
            let response_ = await consult_img({
                prompt: prompt,
                model: model,
                response: response
            });

            return res(response_);
        } catch (error: any) {
            if(typeof error === "object"){
                return rej(error);
            } else {
                return rej({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                });
            }
        }
    });
}

export {
    nexra,
    gpt,
    bing,
    llama,
    blackbox,
    imageai
}

export default {
    nexra,
    gpt,
    bing,
    llama,
    blackbox,
    imageai
}