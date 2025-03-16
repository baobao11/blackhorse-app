import { useState, useEffect } from "react";
import { getChannelListAPI } from "@/apis/article";

function useChannel() {
  // 1、获取频道列表逻辑
  const [channelList, setChannelList] = useState([]);
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelListAPI();
      setChannelList(res.data.channels);
    };
    getChannelList();
  }, []);
  // 2、把需要的数据return出去
  return {
    channelList,
  };
}

export { useChannel };
