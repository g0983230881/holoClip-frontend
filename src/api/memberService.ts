import { Member } from '@/types';

/**
 * 獲取 Hololive 成員列表的服務
 */
export const getMembers = async (): Promise<Member[]> => {
  try {
    const response = await fetch('/api/members');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as Member[];
    return data;
  } catch (error) {
    console.error("Could not fetch members:", error);
    throw error;
  }
};
