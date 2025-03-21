import { request } from "@/utils";

// 获取频道列表

export function getChannelListAPI() {
  return request({
    url: "/channels",
    method: "GET",
  });
}

// 发布文章
export function createArticleAPI(data) {
  return request({
    url: "/mp/articles?draft=false",
    method: "POST",
    data,
  });
}

// 文章列表
export function getArticleListAPI(params) {
  return request({
    url: "/mp/articles",
    method: "GET",
    params,
  });
}
