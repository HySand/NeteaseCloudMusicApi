//更新Cookie ENV
module.exports = async () => {
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