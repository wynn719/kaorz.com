interface JsonResponse {
  code?: number;
  data?: any;
  msg?: string;
}

export function jsonSucc(jsonResponse: JsonResponse) {
  const defaultRes: JsonResponse = { code: 0, data: null, msg: 'success' };

  return {
    ...defaultRes,
    ...jsonResponse,
  } as JsonResponse
}

export function jsonFail(jsonResponse: JsonResponse) {
  const defaultRes: JsonResponse = { code: 1, data: null, msg: 'fail' };

  return {
    ...defaultRes,
    ...jsonResponse,
  } as JsonResponse
}