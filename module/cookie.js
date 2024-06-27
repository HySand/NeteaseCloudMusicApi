//更新后端Cookie
    try {
        const updateEdgeConfig = await fetch(
          'https://api.vercel.com/v1/edge-config/ecfg_s5mlaclrjfl2nzclxmkibfpvtntm/items',
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer `+ process.env.VERCEL_ACCESS_TOKEN,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
            }),
          },
        );
        const result = await updateEdgeConfig.json();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
      return {
        status: 200,
        body: {
          code: 200,
          data: result,
        },
      }
