//更新Cookie ENV
module.exports = async (query, fetch) => {

    const body = JSON.stringify({
        items: [
            {
                operation: 'update',
                key: '__csrf',
                value: 'v1',
            },
            {
                operation: 'update',
                key: 'MUSIC_U',
                value: 'v2',
            },
            {
                operation: 'update',
                key: 'NMTID',
                value: 'v3',
            },
        ],
    });

    const updateEdgeConfig = await fetch(
        'https://api.vercel.com/v1/edge-config/ecfg_s5mlaclrjfl2nzclxmkibfpvtntm/items',
        {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body,
        },
    );
    const result = await updateEdgeConfig.json();
    console.log(result);
    if (response.ok) {
        const result = await response.json();
        // 返回成功响应
        res.status(200).json({
          status: 200,
          body: {
            code: 200,
            data: result,
          },
        });
      } else {
        // 返回错误响应
        res.status(response.status).json({
          status: response.status,
          body: {
            code: response.status,
            message: 'Failed to update Edge Config',
          },
        });
      }
}