export default defineEventHandler((event) => {
    const authHeader = getHeader(event, 'Authorization');

    if (!authHeader || authHeader !== 'Bearer xyz'){
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        }));
    }

    return[{
        id: 1,
        title: 'Product 1',
        price: 125,        
    },
    {
        id: 2,
        title: 'Product 2',
        price: 250,        
    }
]

});