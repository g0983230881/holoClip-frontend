/**
 * 獲取 Hololive 成員列表的服務
 */
export const getMembers = async () => {
  try {
    const response = await fetch('/api/members');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch members:", error);
    // 根據應用程式的需求，可以選擇重新拋出錯誤或回傳一個空陣列/null
    throw error;
  }
};