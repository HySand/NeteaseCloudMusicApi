//更新Cookie ENV
module.exports = async (query) => {
    const body = JSON.stringify({
        items: [
            {
                operation: 'update',
                key: '__csrf',
                value: query.cookie[__csrf],
            },
            {
                operation: 'update',
                key: 'MUSIC_U',
                value: query.cookie[MUSIC_U],
            },
            {
                operation: 'update',
                key: 'NMTID',
                value: query.cookie[NMTID],
            },
        ],
    });
    try {
        const res = await fetch(
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
        console.log("finish");
        const result = await res.json();
        return {
        status: 200,
        body: {
          code: 200,
          data: result,
        },
    }
    } catch (error) {
        console.log(error);
    }
    
}