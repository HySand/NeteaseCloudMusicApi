//更新后端Cookie
module.exports = async (query, fetch) => {
    try {
        const updateEdgeConfig = await fetch(
          'https://api.vercel.com/v1/edge-config/ecfg_s5mlaclrjfl2nzclxmkibfpvtntm/items',
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              items: [
                {
                  operation: '__csrf',
                  key: 'example_key_1',
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
}