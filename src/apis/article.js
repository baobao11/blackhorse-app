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
// 更新文章
export function updateArticleAPI(data) {
  return request({
    url: `/mp/articles/${data.id}?draft=false`,
    method: "PUT",
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


// 删除文章
export function deleteArticleAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: "DELETE"
  })
}

// 获取文章详情
export function getArticleById(id) {
  return request({
    url: `/mp/articles/${id}`
  })
}