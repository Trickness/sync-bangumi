var main = () => {
    $.jsonRPC.setup({
        endPoint: 'http://localhost:5080',
        namespace: ''
    });
    $.jsonRPC.request('myMethod', {
        params: [1,2],
        success: function(result) {
            console.log(result)
            // Do something with the result here
            // It comes back as an RPC 2.0 compatible response object
        },
        error: function(result) {
            console.log(result)
            // Result is an RPC 2.0 compatible response object
        }
    });
}