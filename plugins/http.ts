export default defineNuxtPlugin(() => {
    const fetcher = $fetch.create({
        baseURL: '/api',
        onRequest({request, options}){
            const authHeader = { Authorization: 'Bearer xyz' }
            options.headers = Object.assign(authHeader, options.headers)
        }
    }) 

    return{ 
        provide: { 
        http: {}
    }
};
});