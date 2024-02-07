import { SetStateAction, useEffect, useState } from 'react';
import { IRequestData } from '../api';

interface UseRequestOptionsProps {
  /*
   * 手动开启
   */
  manual?: boolean;
  /*
   * 请求参数
   */
  initialData: IRequestData;
  /*
   * 请求成功回调
   */
  onSuccess?: (res: any) => void;
}

const useRequest = (
  requestFn: (
    initialData: IRequestData,
  ) => Promise<SetStateAction<any>>,
  options: UseRequestOptionsProps,
) => {
  const [data, setData] = useState<SetStateAction<any>>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { manual, initialData, onSuccess } = options;

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);
    !manual && request();
  }, [manual]);

  // useRequest业务逻辑
  const request = async () => {
    try {
      const res = await requestFn(initialData);
      setData(res);
      // 请求成功响应回调
      onSuccess && onSuccess(res);
    } catch (err) {
      err && setError(JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, request };
};

export default useRequest;
