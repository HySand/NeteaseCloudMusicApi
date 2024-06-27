//更新Cookie ENV
module.exports = async (query, fetch) => {
    console.log("starting cookie");

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
    console.log("starting building fetch");
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
    const result = await res.json();
    console.log(result);
    return {
        status: 200,
        body: {
          code: 200,
          data: result,
        },
    }
}