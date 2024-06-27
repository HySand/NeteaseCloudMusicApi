//更新后端Cookie
module.exports = async (query, fetch) => {
    const res = await fetch(
        'https://api.vercel.com/v1/edge-config/ecfg_s5mlaclrjfl2nzclxmkibfpvtntm/items',
        {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                items: [
                    {
                        operation: 'update',
                        key: '__csrf',
                        value: query.cookie['__csrf'],
                    },
                    {
                        operation: 'update',
                        key: 'MUSIC_U',
                        value: query.cookie['MUSIC_U'],
                    },
                    {
                        operation: 'update',
                        key: 'NMTID',
                        value: query.cookie['NMTID'],
                    }
                ],
            }),
        }
    );
    const result = res.body.data;
    result.sort((a, b) => {
        return ids.indexOf(String(a.id)) - ids.indexOf(String(b.id))
      })
    return {
      status: 200,
      body: {
        code: 200,
        data: result,
      },
    }
  }