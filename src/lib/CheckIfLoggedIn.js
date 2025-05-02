import { PUBLIC_LOGIN_URI_SERVER, PUBLIC_TOKEN_URI_SERVER } from "$env/static/public";

export async function CheckIfLoggedIn()
{
    try {
        const res = await fetch(PUBLIC_TOKEN_URI_SERVER, { credentials: 'include' });
		let data = await res.json();	
		if (!data.success) throw new Error('Not authenticated');
        return true;
    }
    catch(error)
    {
        window.location.href = PUBLIC_LOGIN_URI_SERVER;
        return false;
    }
}