export default async function({
    app,
    $auth,
}) {
    console.log('auth executed')
    if (!$auth.loggedIn) {
        return
    }

    const auth = $auth;

    const authStrategy = auth.strategy.name;
    if (authStrategy === 'facebook' || authStrategy === 'google') {
        const token = auth.getToken(authStrategy).substr(7);
        // const authStrategyConverted = authStrategy === 'facebook' ? 'facebook' : 'google';
        const url = `login-${authStrategy}`;

        try {
            let myUrl = {};
            if(authStrategy == 'google'){
                myUrl = {};
                myUrl.access_token = token;
            }else if(authStrategy == 'facebook'){
                myUrl = {};
                myUrl.accessToken = token;
            }

            app.$axios.setHeader('Authorization', null)
            await app.$axios.$post(url, myUrl).then((res) => {
                console.log("After login", res)
                auth.setToken('local', "Bearer " + res.token);
                setTimeout(async() => {
                    auth.setStrategy('local');
                    setTimeout(async() => {
                        await auth.fetchUser();
                    })
                });
            });
            // console.log(data)

        } catch (e) {
            console.log(e);
        }
    }
}